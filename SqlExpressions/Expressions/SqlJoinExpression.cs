namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing join clause
    /// </summary>
    /// <seealso cref="SqlExpressions.Expressions.SqlExpression" />
    public class SqlJoinExpression : SqlExpression
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
        public override SqlExpressionType ExpressionType => SqlExpressionType.Join;

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
        /// Gets the "on" condition.
        /// </summary>
        /// <value>
        /// The condition.
        /// </value>
        public SqlExpression Condition { get; private set; }
        /// <summary>
        /// Gets the type of the join.
        /// </summary>
        /// <value>
        /// The type of the join.
        /// </value>
        public SqlJoinType JoinType { get; private set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlJoinExpression"/> class.
        /// </summary>
        /// <param name="left">The left expression.</param>
        /// <param name="right">The right expression.</param>
        /// <param name="condition">The "on" condition.</param>
        /// <param name="joinType">Type of the join.</param>
        public SqlJoinExpression(SqlExpression left, SqlExpression right, SqlExpression condition, SqlJoinType joinType)
        {
            Left = left;
            Right = right;
            Condition = condition;
            JoinType = joinType;
        }
    }
    /// <summary>
    /// Enum representing type of join
    /// </summary>
    public enum SqlJoinType
    {
        /// <summary>
        /// The inner
        /// </summary>
        Inner,
        /// <summary>
        /// The left outer
        /// </summary>
        LeftOuter,
        /// <summary>
        /// The right outer
        /// </summary>
        RightOuter,
        /// <summary>
        /// The full
        /// </summary>
        Full
    }
}
