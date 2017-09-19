namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Expression representing constant value.
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlConstantExpression:SqlExpression
    {
        /// <summary>
        /// Gets the return type of the expression.
        /// </summary>
        /// <value>
        /// The type of the return..
        /// </value>
        public override SqlType ReturnType { get; }
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType => SqlExpressionType.Constant;
        /// <summary>
        /// Accepts the specified visitor.
        /// </summary>
        /// <typeparam name="T">Return type.</typeparam>
        /// <param name="visitor">The visitor.</param>
        /// <returns>Returns processed value from expression.</returns>
        public override T Accept<T>(ISqlVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
        /// <summary>
        /// Constant value.
        /// </summary>
        /// <value>
        /// The constant.
        /// </value>
        public object Constant { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlConstantExpression"/> class.
        /// </summary>
        /// <param name="returnType">Type of the constant.</param>
        /// <param name="constant">The constant.</param>
        public SqlConstantExpression(SqlType returnType, object constant)
        {
            ReturnType = returnType;
            Constant = constant;
        }
    }
}
