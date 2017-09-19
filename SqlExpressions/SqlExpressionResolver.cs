using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;

using SqlExpressions.Expressions;

namespace SqlExpressions
{
    class TempSource : ISource
    {
        public string CallName { get; private set; }

        public TransferObjectId TransferObjectId => TransferObjectId.ISource;

        public TempSource(string callName)
        {
            CallName = callName;
        }
    }

    /// <summary>
    /// Type responsible for resolving types of SqlExpressions objects.
    /// </summary>
    public static class SqlExpressionResolver
    {
        private static Type GetFittingForTransferObjectId(TransferObjectId id)
        {
            switch (id)
            {
                case TransferObjectId.ISource:
                    return typeof(TempSource);
                case TransferObjectId.SqlAliasExpression:
                    return typeof(SqlAliasExpression);
                case TransferObjectId.SqlAnnotation:
                    return typeof(SqlAnnotation);
                case TransferObjectId.SqlBinaryExpression:
                    return typeof(SqlBinaryExpression);
                case TransferObjectId.SqlColumnExpression:
                    return typeof(SqlColumnExpression);
                case TransferObjectId.SqlConstantExpression:
                    return typeof(SqlConstantExpression);
                case TransferObjectId.SqlJoinExpression:
                    return typeof(SqlJoinExpression);
                case TransferObjectId.SqlOrderedExpression:
                    return typeof(SqlOrderedExpression);
                case TransferObjectId.SqlParameterExpression:
                    return typeof(SqlParameterExpression);
                case TransferObjectId.SqlQueryExpression:
                    return typeof(SqlQueryExpression);
                case TransferObjectId.SqlTableExpression:
                    return typeof(SqlTableExpression);
                case TransferObjectId.SqlUnaryExpression:
                    return typeof(SqlUnaryExpression);
                case TransferObjectId.SqlType:
                    return typeof(SqlType);
                default:
                    throw new NotImplementedException("TransferObjectId <--> Type");
            }
        }

        private static object ResolveExpando(ExpandoObject expando)
        {
            var dict = (IDictionary<string, object>)expando;
            // resolve objects for each property
            var resolved = dict.ToDictionary(e => e.Key.ToLower(), e => ResolveObject(e.Value));
            if (!resolved.Keys.Contains("transferobjectid"))
                throw new ArgumentException("Unable to parse. Object doesnt have TransferObjectId property");
            Type fitting = GetFittingForTransferObjectId((TransferObjectId)resolved["transferobjectid"]);

            var ctor = fitting
                .GetTypeInfo()
                .GetConstructors(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Instance | BindingFlags.CreateInstance)
                .SingleOrDefault();
            if (ctor == null) throw new ArgumentException($"Unable to parse. More than one constructor for the type \"{fitting.Name}\"");
            // based on convention, that constructor's arguments have the same names as corresponding properties               
            var parameters = ctor.GetParameters().Select(
                e => resolved.ContainsKey(e.Name.ToLower()) ?
                    resolved[e.Name.ToLower()] :
                    throw new ArgumentException($"Unable to parse. Couldn't find constructor argument \"{e.Name}\" in type \"{fitting.Name}\"")).ToArray();

            var created = ctor.Invoke(parameters);
            return created;
        }

        private static object ResolveList(object obj)
        {
            var list = ((List<object>)obj).Select(e => ResolveObject(e)).ToList();
            if (list.Count == 0) return new List<SqlExpression>();
            var elemType = list[0].GetType();
            // assumption that elements are of the same type 
            var nListType = typeof(List<>).MakeGenericType(elemType);
            var nList = Activator.CreateInstance(nListType);
            var addMethod = nListType.GetTypeInfo().GetMethod("Add", new[] { elemType });
            foreach (var sqlExpression in list)
            {
                if (!elemType.GetTypeInfo().IsAssignableFrom(sqlExpression.GetType()))
                    throw new ArgumentException("Unable to parse. Not all collection's elements are of the same type.");
                addMethod.Invoke(nList, new object[] { sqlExpression });
            }
            return nList;
        }

        private static object ResolveObject(object obj)
        {
            // single object
            if (obj is ExpandoObject expando)
            {
                return ResolveExpando(expando);
            }
            // non-empty collection
            else if (obj is List<object>)
            {
                return ResolveList(obj);
            }
            // Int
            else if (obj is Int64)
                return int.Parse(obj.ToString());
            // if empty collection then return List<SqlExpression>
            else if (obj is IEnumerable && !(obj is string)) return new List<SqlExpression>();
            return obj;
        }

        /// <summary>
        /// Resolving a properly SqlExpression Type for the given object.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns>Returns given object as SqlExpression</returns>
        public static SqlExpression Resolve(object obj)
        {
            return ResolveObject(obj) as SqlExpression;
        }
    }
}
