namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Expression representing column
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlColumnExpression : SqlExpression
    {
        /// <summary>
        /// Gets the return type of the expression
        /// </summary>
        /// <value>
        /// The type of the return.
        /// </value>
        public override SqlType ReturnType { get; }
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType => SqlExpressionType.Column;
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
        /// Gets the column source.
        /// </summary>
        /// <value>
        /// The source.
        /// </value>
        public ISource Source { get; internal set; }
        /// <summary>
        /// Gets the column name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlColumnExpression"/> class.
        /// </summary>
        /// <param name="returnType">Type of the column.</param>
        /// <param name="source">The column source.</param>
        /// <param name="name">The column name.</param>
        public SqlColumnExpression(SqlType returnType, ISource source, string name)
        {
            ReturnType = returnType;
            Source = source;
            Name = name;
        }
    }
}
