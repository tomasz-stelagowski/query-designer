using System;

namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing any unary expression
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlUnaryExpression : SqlExpression
    {
        /// <summary>
        /// Gets the return type of the expression
        /// </summary>
        /// <value>
        /// The type of the return.
        /// </value>
        /// <exception cref="System.ArgumentOutOfRangeException"></exception>
        public override SqlType ReturnType {
            get
            {
                switch (ExpressionType)
                {
                   
                    case SqlExpressionType.Count:
                        return SqlType.Integer;
                    case SqlExpressionType.Sum:
                    case SqlExpressionType.Average:
                    case SqlExpressionType.Min:
                    case SqlExpressionType.Max:
                        return Expression.ReturnType;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public override SqlExpressionType ExpressionType { get; }
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
        /// Gets the inner expression.
        /// </summary>
        /// <value>
        /// The expression.
        /// </value>
        public SqlExpression Expression { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlUnaryExpression"/> class.
        /// </summary>
        /// <param name="expressionType">Type of the unary expression.</param>
        /// <param name="expression">The inner expression.</param>
        public SqlUnaryExpression(SqlExpressionType expressionType, SqlExpression expression)
        {
            ExpressionType = expressionType;
            Expression = expression;
        }
    }
}
