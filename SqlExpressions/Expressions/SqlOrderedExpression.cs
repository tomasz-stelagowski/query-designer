namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing ordered expression
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlOrderedExpression : SqlExpression
    {
        /// <summary>
        /// Gets the return type of the expression.
        /// </summary>
        /// <value>
        /// The type of the return.
        /// </value>
        public override SqlType ReturnType => InnerExpression.ReturnType;

        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType => SqlExpressionType.Ordered;

        /// <summary>
        /// Gets the inner expression.
        /// </summary>
        /// <value>
        /// The inner expression.
        /// </value>
        public SqlExpression InnerExpression { get; private set; }
        /// <summary>
        /// Gets the type of the order.
        /// </summary>
        /// <value>
        /// The type of the order.
        /// </value>
        public OrderType OrderType { get; private set; }
        /// <summary>
        /// Accepts the specified visitor.
        /// </summary>
        /// <typeparam name="T">Return type</typeparam>
        /// <param name="visitor">The visitor.</param>
        /// <returns>
        /// Returns processed value from expression
        /// </returns>
        public override T Accept<T>(ISqlVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlOrderedExpression"/> class.
        /// </summary>
        /// <param name="innerExpression">The inner expression.</param>
        /// <param name="orderType">Type of the order.</param>
        public SqlOrderedExpression(SqlExpression innerExpression, OrderType orderType)
        {
            InnerExpression = innerExpression;
            OrderType = orderType;
        }
    }
}
