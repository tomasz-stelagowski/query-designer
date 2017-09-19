using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

using SqlExpressions.Expressions;

namespace SqlExpressions
{
    /// <summary>
    /// Type responsible for genereting sql query.
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.ISqlVisitor{T}" />
    public class SqlGenerator : ISqlVisitor<string>
    {
        private static string GetPattern(SqlExpressionType type)
        {
            switch (type)
            {
                case SqlExpressionType.IsNull:
                    return "({0} IS NULL)";
                case SqlExpressionType.Count:
                    return "COUNT({0})";
                case SqlExpressionType.Sum:
                    return "SUM({0})";
                case SqlExpressionType.Average:
                    return "AVG({0})";
                case SqlExpressionType.Min:
                    return "MIN({0})";
                case SqlExpressionType.Max:
                    return "MAX({0})";
                case SqlExpressionType.And:
                    return "({0} AND {1})";
                case SqlExpressionType.Or:
                    return "({0} OR {1})";
                case SqlExpressionType.Equal:
                    return "({0} = {1})";
                case SqlExpressionType.NotEqual:
                    return "({0} <> {1})";
                case SqlExpressionType.Smaller:
                    return "({0} < {1})";
                case SqlExpressionType.Greater:
                    return "({0} > {1})";
                case SqlExpressionType.SmallerEqual:
                    return "({0} <= {1})";
                case SqlExpressionType.GreaterEqual:
                    return "({0} >= {1})";
                case SqlExpressionType.In:
                    return "({0} IN {1})";
                case SqlExpressionType.Like:
                    return "({0} LIKE {1})";
                case SqlExpressionType.Between:
                    return "({0} BETWEEN {1} AND {2})";
                case SqlExpressionType.Coalesce:
                    return "COALESCE({0},{1})";
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, null);
            }
        }
        /// <summary>
        /// Type representing constant expression builder.
        /// </summary>
        /// <param name="constant">The constant expression.</param>
        /// <returns>Returns sql string for constant</returns>
        public delegate string SqlConstantBuilder(SqlConstantExpression constant);
        /// <summary>
        /// The constant builder.
        /// </summary>
        public static SqlConstantBuilder ConstantBuilder = BuildConstant;

        private static readonly Lazy<CultureInfo> USCultureInfo =
            new Lazy<CultureInfo>(() => new CultureInfo("en-US"));

        private static string BuildConstant(SqlConstantExpression constant)
        {
            if (constant.Constant == null) return "null";
            
            switch(constant.ReturnType.SqlTypeEnum)
            {
                case SqlTypeEnum.Boolean:
                    return ((bool)constant.Constant) ? "1" : "0";
                case SqlTypeEnum.Decimal:
                case SqlTypeEnum.Integer:
                    return ((IConvertible)constant.Constant).ToString(USCultureInfo.Value);
                case SqlTypeEnum.Varchar:
                    return $"'{constant.Constant.ToString()}'";
                case SqlTypeEnum.DateTime:
                    return $"'{((DateTime)constant.Constant):yyyy-MM-dd}'";
            }
            throw new NotImplementedException("Constant builder");
        }

        private Dictionary<SqlConstantExpression, SqlParameter> _paremeters;
        UInt64 _parameterCounter;
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlGenerator"/> class.
        /// </summary>
        public SqlGenerator()
        {
            _paremeters = new Dictionary<SqlConstantExpression, SqlParameter>();
            _parameterCounter = 0;
        }
        /// <summary>
        /// Generates the SQL with parameters.
        /// </summary>
        /// <param name="expression">The expression.</param>
        /// <returns>Tuple with sql query and collection of sql parameters</returns>
        public Tuple<string, IEnumerable<SqlParameter>> GenerateSqlWithParams(SqlExpression expression)
        {
            _paremeters.Clear();
            _parameterCounter = 0;
            var sql = Visit(expression);
            return Tuple.Create<string, IEnumerable<SqlParameter>>(sql, _paremeters.Values.ToList());
        }
        /// <summary>
        /// Generates the SQL, with inserted parameters.
        /// </summary>
        /// <param name="expression">The expression.</param>
        /// <returns>Returns SQL query.</returns>
        public string GenerateSql(SqlExpression expression)
        {
            var tuple = GenerateSqlWithParams(expression);
            var sql = tuple.Item1;
            var header = "";
            foreach (var parameter in tuple.Item2)
            {
                if (parameter.Constant is SqlParameterExpression)
                {
                    var @param = parameter.Constant as SqlParameterExpression;
                    header += ($"DECLARE @{parameter.Name} {@param.FullType}" + (@param.Constant == null ? ";" : $" = {ConstantBuilder(@param)};"));
                    header += Environment.NewLine;
                }
                else
                    sql = sql.Replace(parameter.Name, ConstantBuilder(parameter.Constant));
            }
            return header + sql;
        }
        /// <summary>
        /// Wrapper method for interface ISqlVisitor.
        /// </summary>
        /// <param name="sqlExpression">The SQL expression.</param>
        /// <returns>Returns generated SQL query for expression.</returns>
        protected string Visit(SqlExpression sqlExpression)
        {
            return (this as ISqlVisitor<string>).Visit(sqlExpression);
        }
        /// <summary>
        /// Visits the specified SQL expression.
        /// </summary>
        /// <param name="sqlExpression">The SQL expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlExpression sqlExpression)
        {
            return sqlExpression.Accept(this);
        }
        /// <summary>
        /// Visits the specified SQL binary expression.
        /// </summary>
        /// <param name="sqlBinaryExpression">The SQL binary expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlBinaryExpression sqlBinaryExpression)
        {
            return string.Format(GetPattern(sqlBinaryExpression.ExpressionType), Visit(sqlBinaryExpression.Left),
                Visit(sqlBinaryExpression.Right));
        }
        /// <summary>
        /// Visits the specified SQL unary expression.
        /// </summary>
        /// <param name="sqlUnaryExpression">The SQL unary expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlUnaryExpression sqlUnaryExpression)
        {
            return string.Format(GetPattern(sqlUnaryExpression.ExpressionType), Visit(sqlUnaryExpression.Expression));
        }
        /// <summary>
        /// Visits the specified SQL constant expression.
        /// </summary>
        /// <param name="sqlConstantExpression">The SQL constant expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlConstantExpression sqlConstantExpression)
        {
            if (!_paremeters.ContainsKey(sqlConstantExpression))
            {
                var paramName = "@p" + (_parameterCounter++);
                _paremeters.Add(sqlConstantExpression,new SqlParameter(sqlConstantExpression, paramName));
            }
            return _paremeters[sqlConstantExpression].Name;
        }
        /// <summary>
        /// Visits the specified SQL column expression.
        /// </summary>
        /// <param name="sqlColumnExpression">The SQL column expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlColumnExpression sqlColumnExpression)
        {
            return $"[{sqlColumnExpression.Source.CallName}].[{sqlColumnExpression.Name}]";
        }
        /// <summary>
        /// Visits the specified SQL table expression.
        /// </summary>
        /// <param name="sqlTableExpression">The SQL table expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlTableExpression sqlTableExpression)
        {
            return sqlTableExpression.Alias != null
                ? $"[{sqlTableExpression.TableName}] AS [{sqlTableExpression.Alias}]"
                : $"[{sqlTableExpression.TableName}]";
        }
        /// <summary>
        /// Visits the specified SQL query expression.
        /// </summary>
        /// <param name="sqlQueryExpression">The SQL query expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlQueryExpression sqlQueryExpression)
        {
            Func<string, string, string> JoinStrings = (a, b) => a + ", " + b;
            StringBuilder builder = new StringBuilder();
            string topSection = sqlQueryExpression.Limit > 0 ? $"TOP {sqlQueryExpression.Limit}" : "";
            builder.AppendLine(
                $"SELECT { topSection } {sqlQueryExpression.Select.Select(Visit).Aggregate(JoinStrings)}");
            builder.AppendLine($"FROM {Visit(sqlQueryExpression.From)}");
            if (sqlQueryExpression.Where != null) builder.AppendLine($"WHERE {Visit(sqlQueryExpression.Where)}");
            if (sqlQueryExpression.GroupBy?.Any() ?? false)
                builder.AppendLine($"GROUP BY {sqlQueryExpression.GroupBy.Select(Visit).Aggregate(JoinStrings)}");
            if (sqlQueryExpression.Having != null)
                builder.AppendLine($"HAVING {Visit(sqlQueryExpression.Having)}");
            if (sqlQueryExpression.OrderBy?.Any() ?? false)
                builder.AppendLine($"ORDER BY {sqlQueryExpression.OrderBy.Select(Visit).Aggregate(JoinStrings)}");

            return builder.ToString();
        }
        /// <summary>
        /// Visits the specified SQL binary expression.
        /// </summary>
        /// <param name="sqlBinaryExpression">The SQL binary expression.</param>
        /// <returns>Returns processed value from espression.</returns>
        /// <exception cref="System.NotImplementedException">Not implemented yet.</exception>
        string ISqlVisitor<string>.Visit(SqlAnnotation sqlBinaryExpression)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Visits the specified SQL join expression.
        /// </summary>
        /// <param name="sqlJoinExpression">The SQL join expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        string ISqlVisitor<string>.Visit(SqlJoinExpression sqlJoinExpression)
        {
            return
                $"{Visit(sqlJoinExpression.Left)} {Visit(sqlJoinExpression.JoinType)} JOIN {Visit(sqlJoinExpression.Right)} ON {Visit(sqlJoinExpression.Condition)}";
        }
        /// <summary>
        /// Visits the specified join type.
        /// </summary>
        /// <param name="joinType">Type of the join.</param>
        /// <returns>Returns processed value from expression.</returns>
        /// <exception cref="System.ArgumentOutOfRangeException">joinType - null</exception>
        protected string Visit(SqlJoinType joinType)
        {
            switch (joinType)
            {
                case SqlJoinType.Inner:
                    return "INNER";
                case SqlJoinType.LeftOuter:
                    return "LEFT OUTER";
                case SqlJoinType.RightOuter:
                    return "RIGHT OUTER";
                case SqlJoinType.Full:
                    return "FULL";
                default:
                    throw new ArgumentOutOfRangeException(nameof(joinType), joinType, null);
            }
        }

        /// <summary>
        /// Visits the specified SQL alias expression.
        /// </summary>
        /// <param name="sqlAliasExpression">The SQL alias expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        public string Visit(SqlAliasExpression sqlAliasExpression)
        {
            return $"({Visit(sqlAliasExpression.InnerExpression)}) AS [{sqlAliasExpression.Alias}]";
        }

        /// <summary>
        /// Visits the specified SQL parameter expression.
        /// </summary>
        /// <param name="sqlParameterExpression">The SQL parameter expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        public string Visit(SqlParameterExpression sqlParameterExpression)
        {
            if (!_paremeters.ContainsKey(sqlParameterExpression))
            {
                var paramName = "@" + sqlParameterExpression.Name;
                _paremeters.Add(sqlParameterExpression, new SqlParameter(sqlParameterExpression, sqlParameterExpression.Name));
            }
            return "@" + sqlParameterExpression.Name;
        }

        /// <summary>
        /// Visits the specified SQL ordered expression.
        /// </summary>
        /// <param name="sqlOrderedExpression">The SQL ordered expression.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        public string Visit(SqlOrderedExpression sqlOrderedExpression)
        {
            return $"{Visit(sqlOrderedExpression.InnerExpression)} {Visit(sqlOrderedExpression.OrderType)}";
        }

        /// <summary>
        /// Visits the specified order type.
        /// </summary>
        /// <param name="orderType">The order type.</param>
        /// <returns>
        /// Returns processed value from espression.
        /// </returns>
        public string Visit(OrderType orderType)
        {
            switch (orderType)
            {
                case OrderType.Ascending:
                    return "ASC";
                case OrderType.Descending:
                    return "DESC";
                default:
                    throw new NotImplementedException("OrderType");
            }
        }
    }
}
