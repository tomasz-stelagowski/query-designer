namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing alias
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlAliasExpression : SqlExpression
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
        public override SqlExpressionType ExpressionType => SqlExpressionType.Alias;

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
        /// Gets the inner expression.
        /// </summary>
        /// <value>
        /// The inner expression.
        /// </value>
        public SqlExpression InnerExpression { get; private set; }

        /// <summary>
        /// Gets the alias.
        /// </summary>
        /// <value>
        /// The alias.
        /// </value>
        public string Alias { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlAliasExpression"/> class.
        /// </summary>
        /// <param name="innerExpression">The inner expression.</param>
        /// <param name="alias">The alias.</param>
        public SqlAliasExpression(SqlExpression innerExpression, string alias)
        {
            InnerExpression = innerExpression;
            Alias = alias;
        }
    }
}
