using System;

namespace SqlExpressions.Expressions
{

    /// <summary>
    /// Base class for all types representing expressions.
    /// </summary>
    public abstract class SqlExpression : IExpressionTransferObject
    {
        /// <summary>
        /// Gets the return type of the expression.
        /// </summary>
        /// <value>
        /// The type of the return.
        /// </value>
        public abstract SqlType ReturnType { get; }
        /// <summary>
        /// Gets the type of the expression.
        /// </summary>
        /// <value>
        /// The type of the expression.
        /// </value>
        public abstract SqlExpressionType ExpressionType { get; }

        /// <summary>
        /// Gets the transfer object identifier.
        /// </summary>
        /// <value>
        /// The transfer object identifier.
        /// </value>
        public TransferObjectId TransferObjectId 
            => (TransferObjectId)(Enum.Parse(typeof(TransferObjectId), this.GetType().Name));

        /// <summary>
        /// Accepts the specified visitor.
        /// </summary>
        /// <typeparam name="T">Return type</typeparam>
        /// <param name="visitor">The visitor.</param>
        /// <returns>Returns processed value from expression</returns>
        public abstract T Accept<T>(ISqlVisitor<T> visitor);
    }
}
