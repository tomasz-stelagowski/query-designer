using System.Collections.Generic;
using System.Linq;

namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing table
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    /// <seealso cref="SqlExpressions.Expressions.ISource" />
    public class SqlTableExpression : SqlExpression, ISource
    {
        /// <summary>
        /// Gets the return type of the expression
        /// </summary>
        /// <value>
        /// The type of the return.
        /// </value>
        public override SqlType ReturnType => SqlType.Object;
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType => SqlExpressionType.Table;
        /// <summary>
        /// Accepts the specified visitor.
        /// </summary>
        /// <typeparam name="T">Return type</typeparam>
        /// <param name="visitor">The visitor.</param>
        /// <returns>Returns processed value from expression</returns>
        public override T Accept<T>(ISqlVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
        /// <summary>
        /// Gets the call name of the object (either table name or alias if assigned).
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string CallName => Alias ?? TableName;
        /// <summary>
        /// Gets the name of the table.
        /// </summary>
        /// <value>
        /// The name of the table.
        /// </value>
        public string TableName { get; private set; }
        /// <summary>
        /// Gets the alias.
        /// </summary>
        /// <value>
        /// The alias.
        /// </value>
        public string Alias { get; private set; }
        /// <summary>
        /// Gets the columns.
        /// </summary>
        /// <value>
        /// The columns.
        /// </value>
        public IEnumerable<SqlColumnExpression> Columns { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlTableExpression"/> class.
        /// </summary>
        /// <param name="tableName">Name of the table.</param>
        /// <param name="columns">The columns.</param>
        /// <param name="alias">The alias.</param>
        public SqlTableExpression(string tableName, IEnumerable<SqlColumnExpression> columns, string alias = null)
        {
            TableName = tableName;
            Alias = alias;
            Columns = columns.Select(e => { e.Source = this;
                return e;
            }).ToList();
        }

    }
}
