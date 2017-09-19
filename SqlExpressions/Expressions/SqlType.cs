using System.Collections.Generic;
using System.Linq;

namespace SqlExpressions.Expressions
{
    /// <summary>
    /// Type representing SQL type.
    /// </summary>
    public class SqlType : IExpressionTransferObject
    {
        /// <summary>
        /// The none.
        /// </summary>
        public static SqlType None = new SqlType(SqlTypeEnum.None, false);
        /// <summary>
        /// The object.
        /// </summary>
        public static SqlType Object = new SqlType(SqlTypeEnum.Object, true);
        /// <summary>
        /// The integer.
        /// </summary>
        public static SqlType Integer = new SqlType(SqlTypeEnum.Integer, false);
        /// <summary>
        /// The decimal.
        /// </summary>
        public static SqlType Decimal = new SqlType(SqlTypeEnum.Decimal, false);
        /// <summary>
        /// The varchar.
        /// </summary>
        public static SqlType Varchar = new SqlType(SqlTypeEnum.Varchar, false);
        /// <summary>
        /// The date time.
        /// </summary>
        public static SqlType DateTime = new SqlType(SqlTypeEnum.DateTime, false);
        /// <summary>
        /// The boolean.
        /// </summary>
        public static SqlType Boolean = new SqlType(SqlTypeEnum.Boolean, false);
        /// <summary>
        /// The XML.
        /// </summary>
        public static SqlType Xml = new SqlType(SqlTypeEnum.Xml, false);
        /// <summary>
        /// The integer null.
        /// </summary>
        public static SqlType IntegerNull = new SqlType(SqlTypeEnum.Integer, true);
        /// <summary>
        /// The decimal null.
        /// </summary>
        public static SqlType DecimalNull = new SqlType(SqlTypeEnum.Decimal, true);
        /// <summary>
        /// The varchar null.
        /// </summary>
        public static SqlType VarcharNull = new SqlType(SqlTypeEnum.Varchar, true);
        /// <summary>
        /// The date time null.
        /// </summary>
        public static SqlType DateTimeNull = new SqlType(SqlTypeEnum.DateTime, true);
        /// <summary>
        /// The boolean null.
        /// </summary>
        public static SqlType BooleanNull = new SqlType(SqlTypeEnum.Boolean, true);
        /// <summary>
        /// The XML null.
        /// </summary>
        public static SqlType XmlNull = new SqlType(SqlTypeEnum.Xml, true);
        static IEnumerable<SqlType> collection = new List<SqlType>
        {
            None,
            Object, Integer, Decimal,
            Varchar, DateTime, Boolean, Xml,
            IntegerNull, DecimalNull, VarcharNull,
            DateTimeNull, BooleanNull, XmlNull
        };
        /// <summary>
        /// Gets the specified type.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="nullable">if set to <c>true</c> [nullable].</param>
        /// <returns>Returns type corresponding to type enum, and nullable parameter</returns>
        public static SqlType Get(SqlTypeEnum type, bool nullable)
        {
            return collection.Single(e => e.SqlTypeEnum == type && e.Nullable == nullable);
        }
        /// <summary>
        /// Gets the SQL type enum.
        /// </summary>
        /// <value>
        /// The SQL type enum.
        /// </value>
        public SqlTypeEnum SqlTypeEnum { get; }
        /// <summary>
        /// Gets a value indicating whether this <see cref="SqlType"/> is nullable.
        /// </summary>
        /// <value>
        ///   <c>true</c> if nullable; otherwise, <c>false</c>.
        /// </value>
        public bool Nullable { get; }

        /// <summary>
        /// Gets the transfer object identifier.
        /// </summary>
        /// <value>
        /// The transfer object identifier.
        /// </value>
        public TransferObjectId TransferObjectId => TransferObjectId.SqlType;

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlType"/> class.
        /// </summary>
        /// <param name="sqlTypeEnum">The SQL type enum.</param>
        /// <param name="nullable">if set to <c>true</c> [nullable].</param>
        protected SqlType(SqlTypeEnum sqlTypeEnum, bool nullable)
        {
            SqlTypeEnum = sqlTypeEnum;
            Nullable = nullable;
        }
        /// <summary>
        /// Returns a hash code for this instance.
        /// </summary>
        /// <returns>
        /// A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table. 
        /// </returns>
        public override int GetHashCode()
        {
            return ((int) SqlTypeEnum) << 1 + (Nullable ? 1 : 0);
        }
        /// <summary>
        /// Determines whether the specified <see cref="System.Object" />, is equal to this instance.
        /// </summary>
        /// <param name="obj">The <see cref="System.Object" /> to compare with this instance.</param>
        /// <returns>
        ///   <c>true</c> if the specified <see cref="System.Object" /> is equal to this instance; otherwise, <c>false</c>.
        /// </returns>
        public override bool Equals(object obj)
        {
            if (!(obj is SqlType)) return false;
            SqlType casted= (SqlType) obj;
            return SqlTypeEnum == casted.SqlTypeEnum && Nullable == casted.Nullable;
        }
        /// <summary>
        /// Implements the operator ==.
        /// </summary>
        /// <param name="t1">The t1.</param>
        /// <param name="t2">The t2.</param>
        /// <returns>
        /// The result of the operator.
        /// </returns>
        public static bool operator ==(SqlType t1, SqlType t2)
        {
            return t1?.Equals(t2) ?? t2 == null;
        }
        /// <summary>
        /// Implements the operator !=.
        /// </summary>
        /// <param name="t1">The t1.</param>
        /// <param name="t2">The t2.</param>
        /// <returns>
        /// The result of the operator.
        /// </returns>
        public static bool operator !=(SqlType t1, SqlType t2)
        {
            return !(t1 == t2);
        }
    }
    /// <summary>
    /// Enum representing sql type
    /// </summary>
    public enum SqlTypeEnum
    {
        /// <summary>
        /// The none
        /// </summary>
        None,
        /// <summary>
        /// The object
        /// </summary>
        Object,
        /// <summary>
        /// The integer
        /// </summary>
        Integer,
        /// <summary>
        /// The decimal
        /// </summary>
        Decimal,
        /// <summary>
        /// The varchar
        /// </summary>
        Varchar,
        /// <summary>
        /// The date time
        /// </summary>
        DateTime,
        /// <summary>
        /// The boolean
        /// </summary>
        Boolean,
        /// <summary>
        /// The XML
        /// </summary>
        Xml
    }
}
