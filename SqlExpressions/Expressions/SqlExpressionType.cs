namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Represents type of the expression
    /// </summary>
    public enum SqlExpressionType
    {
        // General        
        /// <summary>
        /// The table
        /// </summary>
        Table,
        /// <summary>
        /// The query
        /// </summary>
        Query,
        /// <summary>
        /// The column
        /// </summary>
        Column,
        /// <summary>
        /// The join
        /// </summary>
        Join,
        /// <summary>
        /// The constant
        /// </summary>
        Constant,
        /// <summary>
        /// The annotation
        /// </summary>
        Annotation,
        //Aggregate funcs        
        /// <summary>
        /// The count
        /// </summary>
        Count,
        /// <summary>
        /// The sum
        /// </summary>
        Sum,
        /// <summary>
        /// The average
        /// </summary>
        Average,
        /// <summary>
        /// The minimum
        /// </summary>
        Min,
        /// <summary>
        /// The maximum
        /// </summary>
        Max,
        //Logical funcs        
        /// <summary>
        /// The and
        /// </summary>
        And,
        /// <summary>
        /// The or
        /// </summary>
        Or,
        /// <summary>
        /// The equal
        /// </summary>
        Equal,
        /// <summary>
        /// The not equal
        /// </summary>
        NotEqual,
        /// <summary>
        /// The smaller
        /// </summary>
        Smaller,
        /// <summary>
        /// The greater
        /// </summary>
        Greater,
        /// <summary>
        /// The smaller equal
        /// </summary>
        SmallerEqual,
        /// <summary>
        /// The greater equal
        /// </summary>
        GreaterEqual,
        /// <summary>
        /// The in
        /// </summary>
        In,
        /// <summary>
        /// The like
        /// </summary>
        Like,
        /// <summary>
        /// The between
        /// </summary>
        Between,
        /// <summary>
        /// The is null
        /// </summary>
        IsNull,
        // Other        
        /// <summary>
        /// The coalesce
        /// </summary>
        Coalesce,
        /// <summary>
        /// The alias
        /// </summary>
        Alias,
        /// <summary>
        /// The parameter
        /// </summary>
        Parameter,
        /// <summary>
        /// The ordered expression
        /// </summary>
        Ordered
    }
}
