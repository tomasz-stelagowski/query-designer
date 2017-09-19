namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing parameter
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlConstantExpression" />
    public class SqlParameterExpression : SqlConstantExpression
    {
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType => SqlExpressionType.Parameter;
        /// <summary>
        /// Gets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; private set; }
        /// <summary>
        /// Gets the full type.
        /// </summary>
        /// <value>
        /// The full type.
        /// </value>
        public string FullType { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlParameterExpression"/> class.
        /// </summary>
        /// <param name="returnType">Type of the return.</param>
        /// <param name="constant">The constant.</param>
        /// <param name="name">The name.</param>
        /// <param name="fullType">The full type.</param>
        public SqlParameterExpression(SqlType returnType, object constant, string name, string fullType)
            : base(returnType, constant)
        {
            Name = name;
            FullType = fullType;
        }

        /// <summary>
        /// Accepts the specified visitor.
        /// </summary>
        /// <typeparam name="T">Return type.</typeparam>
        /// <param name="visitor">The visitor.</param>
        /// <returns>
        /// Returns processed value from expression.
        /// </returns>
        public override T Accept<T>(ISqlVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
    }
}
