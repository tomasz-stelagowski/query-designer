using System;

namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing any binary expression
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlBinaryExpression : SqlExpression
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
                    case SqlExpressionType.And:
                    case SqlExpressionType.Or:
                    case SqlExpressionType.Equal:
                    case SqlExpressionType.Smaller:
                    case SqlExpressionType.Greater:
                    case SqlExpressionType.SmallerEqual:
                    case SqlExpressionType.GreaterEqual:
                    case SqlExpressionType.In:
                    case SqlExpressionType.Like:
                    case SqlExpressionType.Between:
                        return SqlType.Boolean;
                    case SqlExpressionType.Coalesce:
                        return SqlType.Get(Left.ReturnType.SqlTypeEnum, false);
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
        /// Gets the left expression.
        /// </summary>
        /// <value>
        /// The left.
        /// </value>
        public SqlExpression Left { get; private set; }
        /// <summary>
        /// Gets the right expression.
        /// </summary>
        /// <value>
        /// The right.
        /// </value>
        public SqlExpression Right { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlBinaryExpression"/> class.
        /// </summary>
        /// <param name="expressionType">Type of the binary expression.</param>
        /// <param name="left">The left expression.</param>
        /// <param name="right">The right expression.</param>
        public SqlBinaryExpression(SqlExpressionType expressionType, SqlExpression left, SqlExpression right)
        {
            ExpressionType = expressionType;
            Left = left;
            Right = right;
        }
    }
}
