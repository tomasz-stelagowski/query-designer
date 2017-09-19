namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing named source
    /// </summary>
    public interface ISource : IExpressionTransferObject
    {
        /// <summary>
        /// Gets the name of the source.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        string CallName { get; }
    }
}
