namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing visitor visiting sqlexpression hierarchy
    /// </summary>
    /// <typeparam name="T">Return type</typeparam>
    public interface ISqlVisitor<T>
    {
        /// <summary>
        /// Visits the specified SQL expression.
        /// </summary>
        /// <param name="sqlExpression">The SQL expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlExpression sqlExpression);
        /// <summary>
        /// Visits the specified SQL binary expression.
        /// </summary>
        /// <param name="sqlBinaryExpression">The SQL binary expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlBinaryExpression sqlBinaryExpression);
        /// <summary>
        /// Visits the specified SQL unary expression.
        /// </summary>
        /// <param name="sqlUnaryExpression">The SQL unary expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlUnaryExpression sqlUnaryExpression);
        /// <summary>
        /// Visits the specified SQL constant expression.
        /// </summary>
        /// <param name="sqlConstantExpression">The SQL constant expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlConstantExpression sqlConstantExpression);
        /// <summary>
        /// Visits the specified SQL column expression.
        /// </summary>
        /// <param name="sqlColumnExpression">The SQL column expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlColumnExpression sqlColumnExpression);
        /// <summary>
        /// Visits the specified SQL table expression.
        /// </summary>
        /// <param name="sqlTableExpression">The SQL table expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlTableExpression sqlTableExpression);
        /// <summary>
        /// Visits the specified SQL query expression.
        /// </summary>
        /// <param name="sqlQueryExpression">The SQL query expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlQueryExpression sqlQueryExpression);
        /// <summary>
        /// Visits the specified SQL annotation.
        /// </summary>
        /// <param name="sqlAnnotation">The SQL annotation.</param>
        /// <returns>processed value from espression</returns>
        T Visit(SqlAnnotation sqlAnnotation);
        /// <summary>
        /// Visits the specified SQL join expression.
        /// </summary>
        /// <param name="sqlJoinExpression">The SQL join expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlJoinExpression sqlJoinExpression);

        /// <summary>
        /// Visits the specified SQL alias expression.
        /// </summary>
        /// <param name="sqlAliasExpression">The SQL alias expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlAliasExpression sqlAliasExpression);
        /// <summary>
        /// Visits the specified SQL parameter expression.
        /// </summary>
        /// <param name="sqlParameterExpression">The SQL paramter expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlParameterExpression sqlParameterExpression);
        /// <summary>
        /// Visits the specified SQL ordered expression.
        /// </summary>
        /// <param name="sqlOrderedExpression">The SQL ordered expression.</param>
        /// <returns>Returns processed value from espression</returns>
        T Visit(SqlOrderedExpression sqlOrderedExpression);
    }
}
