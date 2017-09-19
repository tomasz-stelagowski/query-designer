namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing sql parameter
    /// </summary>
    public class SqlParameter
    {
        /// <summary>
        /// Gets the constant expression.
        /// </summary>
        /// <value>
        /// The constant.
        /// </value>
        public SqlConstantExpression Constant { get; private set; }
        /// <summary>
        /// Gets the name of parameter.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlParameter"/> class.
        /// </summary>
        /// <param name="constant">The constant expression.</param>
        /// <param name="name">The name of the parameter.</param>
        public SqlParameter(SqlConstantExpression constant, string name)
        {
            Constant = constant;
            Name = name;
        }
    }
}
