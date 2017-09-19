using System.Collections.Generic;

namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Class representing sql query
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlQueryExpression : SqlExpression
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
        public override SqlExpressionType ExpressionType => SqlExpressionType.Query;
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
        /// Selected expressions
        /// </summary>
        public IEnumerable<SqlExpression> Select { get; private set; }
        /// <summary>
        /// Source
        /// </summary>
        public SqlExpression From { get; private set; }
        /// <summary>
        /// Conditions
        /// </summary>
        public SqlExpression Where { get; private set; }
        /// <summary>
        /// Group clauses
        /// </summary>
        public IEnumerable<SqlExpression> GroupBy { get; private set; }
        /// <summary>
        /// Conditions on grouped
        /// </summary>
        public SqlExpression Having { get; private set; }
        /// <summary>
        /// Order by expressions
        /// </summary>
        public IEnumerable<SqlExpression> OrderBy { get; private set; }
        /// <summary>
        /// Additional annotations
        /// </summary>
        public IEnumerable<SqlExpression> Annotations { get; private set; }
        /// <summary>
        /// Limit query to first results
        /// </summary>
        public int Limit { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlQueryExpression"/> class.
        /// </summary>
        /// <param name="select">The select expressions.</param>
        /// <param name="from">Source expression.</param>
        /// <param name="where">Condition expression.</param>
        /// <param name="groupBy">Group by expressions.</param>
        /// <param name="having">Conditions on grouped.</param>
        /// <param name="orderBy">Order by expressions.</param>
        /// <param name="annotations">Additional annotations.</param>
        /// <param name="limit">The limit.</param>
        public SqlQueryExpression(
            IEnumerable<SqlExpression> @select,
            SqlExpression @from,
            SqlExpression @where = null,
            IEnumerable<SqlExpression> groupBy = null,
            SqlExpression having = null,
            IEnumerable<SqlExpression> orderBy = null,
            IEnumerable<SqlExpression> annotations = null,
            int limit = 0)
        {
            Select = @select;
            From = @from;
            Where = @where;
            GroupBy = groupBy;
            Having = having;
            OrderBy = orderBy;
            Annotations = annotations;
            Limit = limit;
        }
    }
}
