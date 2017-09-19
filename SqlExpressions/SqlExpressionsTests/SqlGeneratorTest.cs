using System;
using Xunit;
using SqlExpressions;
using SqlExpressions.Expressions;

namespace SqlExpressionsTests
{
    public class SqlGeneratorTest
    {
        readonly SqlGenerator _generator = new SqlGenerator();
        SqlExpression[] constants = new []
        {
            new SqlConstantExpression(SqlType.Integer, 2),
            new SqlConstantExpression(SqlType.Integer, 5)
        };
        [Fact]
        public void ConstantTest()
        {
            var value = _generator.GenerateSql(constants[1]);
            Assert.Equal("5", value);
        }

        #region tests binary
        public bool BinaryInfixTests(string infix, SqlExpressionType type)
        {
            var value =
               _generator.GenerateSql(new SqlBinaryExpression(type, constants[0], constants[1]));
           return $"(2 {infix} 5)" == value;
        }
        [Fact]
        public void EqualTest()
        {
            Assert.True(BinaryInfixTests("=",SqlExpressionType.Equal));
        }

        [Fact]
        public void AndTest()
        {
            Assert.True(BinaryInfixTests("AND", SqlExpressionType.And));
        }
        [Fact]
        public void OrTest()
        {
            Assert.True(BinaryInfixTests("OR", SqlExpressionType.Or));
        }
        [Fact]
        public void SmallerTest()
        {
            Assert.True(BinaryInfixTests("<", SqlExpressionType.Smaller));
        }
        [Fact]
        public void GreaterTest()
        {
            Assert.True(BinaryInfixTests(">", SqlExpressionType.Greater));
        }
        [Fact]
        public void SmallerEqualTest()
        {
            Assert.True(BinaryInfixTests("<=", SqlExpressionType.SmallerEqual));
        }
        [Fact]
        public void GreaterEqualTest()
        {
            Assert.True(BinaryInfixTests(">=", SqlExpressionType.GreaterEqual));
        }
        [Fact]
        public void InTest()
        {
            Assert.True(BinaryInfixTests("IN", SqlExpressionType.In));
        }
        [Fact]
        public void LikeTest()
        {
            Assert.True(BinaryInfixTests("LIKE", SqlExpressionType.Like));
        }
        #endregion

        [Fact]
        public void ConstantBuilderTest()
        {
            var builder = SqlGenerator.ConstantBuilder;
            Assert.Equal("1",builder(new SqlConstantExpression(SqlType.Boolean, true)));
            Assert.Equal("0", builder(new SqlConstantExpression(SqlType.Boolean, false)));
            Assert.Equal("'string'", builder(new SqlConstantExpression(SqlType.Varchar, "string")));
            Assert.Equal("256", builder(new SqlConstantExpression(SqlType.Integer, 256)));
            Assert.Equal("3.25", builder(new SqlConstantExpression(SqlType.Decimal, 3.25m)));
            Assert.Equal("'2015-04-25'", builder(new SqlConstantExpression(SqlType.DateTime, new DateTime(2015,04,25))));
            Assert.Equal("null", builder(new SqlConstantExpression(SqlType.BooleanNull, null)));
        }

        [Fact]
        public void CoalesceTest()
        {
            var value =
                _generator.GenerateSql(new SqlBinaryExpression(SqlExpressionType.Coalesce, constants[0], constants[1]));
            Assert.Equal("COALESCE(2,5)",value);
        }
        [Fact]
        public void IsNull()
        {
            var value = _generator.GenerateSql(new SqlUnaryExpression(SqlExpressionType.IsNull, constants[1]));
            Assert.Equal("(5 IS NULL)",value);
        }

        #region tests aggregate
        public bool TestAggregate(string func, SqlExpressionType type)
        {
            var value = _generator.GenerateSql(new SqlUnaryExpression(type, constants[0]));
            return $"{func}(2)" == value;
        }
        [Fact]
        public void MinTest()
        {
            Assert.True(TestAggregate("MIN",SqlExpressionType.Min));
        }
        [Fact]
        public void MaxTest()
        {
            Assert.True(TestAggregate("MAX", SqlExpressionType.Max));
        }
        [Fact]
        public void CountTest()
        {
            Assert.True(TestAggregate("COUNT", SqlExpressionType.Count));
        }
        [Fact]
        public void SumTest()
        {
            Assert.True(TestAggregate("SUM", SqlExpressionType.Sum));
        }
        [Fact]
        public void AvgTest()
        {
            Assert.True(TestAggregate("AVG", SqlExpressionType.Average));
        }
#endregion

        [Fact]
        public void Query()
        {
            var columns = new[]
            {
                new SqlColumnExpression(SqlType.Integer, null, "Id"),
                new SqlColumnExpression(SqlType.Varchar, null, "Name")
            };
            var where = new SqlBinaryExpression(SqlExpressionType.And, 
                new SqlBinaryExpression(SqlExpressionType.Equal, columns[0], new SqlConstantExpression(SqlType.Integer, 5)),
                new SqlBinaryExpression(SqlExpressionType.Like, columns[1], new SqlConstantExpression(SqlType.Varchar, "fgr"))
                );
            var source = new SqlTableExpression("Tab",columns,"_tab");
            var query = new SqlQueryExpression(columns,source, where, limit: 5);
            var sql = _generator.GenerateSql(query);
            Assert.True(true);
        }

        [Fact]
        public void ColumnTest()
        {
            var column = new SqlColumnExpression(SqlType.Boolean, null,"Column");
            var table = new SqlTableExpression("Table", new []{column});
            var value = _generator.GenerateSql(column);
            Assert.Equal("[Table].[Column]", value);
        }

        [Fact]
        public void TableTest()
        {
            var table = new SqlTableExpression("Table", new SqlColumnExpression[]{}, "Alias");
            var value = _generator.GenerateSql(table);
            Assert.Equal("[Table] AS [Alias]", value);
        }

        [Fact]
        public void JoinTest()
        {
            var left = new SqlTableExpression("Tab1", new SqlColumnExpression[]{});
            var right = new SqlTableExpression("Tab2", new SqlColumnExpression[] { });
            var condition = new SqlBinaryExpression(SqlExpressionType.Equal, constants[0], constants[0]);
            var join = new SqlJoinExpression(left, right, condition, SqlJoinType.Inner);
            var value = _generator.GenerateSql(join);
            Assert.Equal("[Tab1] INNER JOIN [Tab2] ON (2 = 2)", value);
        }

        [Fact]
        public void AliasTest()
        {
            var alias = new SqlAliasExpression(constants[0], "Sample");
            var value = _generator.GenerateSql(alias);
            Assert.Equal("(2) AS [Sample]", value);
        }

        [Fact]
        public void OrderedTest()
        {
            var column = new SqlColumnExpression(SqlType.Boolean, null, "Column");
            var table = new SqlTableExpression("Table", new[] { column });
            var ordered = new SqlOrderedExpression(column, OrderType.Ascending);
            var value = _generator.GenerateSql(ordered);
            Assert.Equal("[Table].[Column] ASC", value);
        }

        [Fact]
        public void ParameterWithValueTest()
        {
            var param = new SqlParameterExpression(SqlType.Integer, 1, "parameter", "integer");
            var value = _generator.GenerateSql(param);
            // Generate declaration of the parameter with value and in next line it's name
            Assert.Equal("DECLARE @parameter integer = 1;" + Environment.NewLine + "@parameter", value);
        }

        [Fact]
        public void ParameterWithoutValueTest()
        {
            var param = new SqlParameterExpression(SqlType.IntegerNull, null, "parameter", "integer");
            var value = _generator.GenerateSql(param);
            // Generate declaration of the parameter and in next line it's name
            Assert.Equal("DECLARE @parameter integer;" + Environment.NewLine + "@parameter", value);
        }

        [Fact]
        public void ExpressionTransferIdTest()
        {
            var table = new SqlTableExpression("Table",new SqlColumnExpression[] { });
            Assert.Equal(TransferObjectId.SqlTableExpression, table.TransferObjectId);
        }
    }
}
