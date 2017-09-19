namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Interface implemented by all tranfer objects
    /// </summary>
    public interface IExpressionTransferObject
    {
        /// <summary>
        /// Gets the transfer object identifier.
        /// </summary>
        /// <value>
        /// The transfer object identifier.
        /// </value>
        TransferObjectId TransferObjectId { get; }
    }
}
