using System.Dynamic;
using Newtonsoft.Json;
using SqlExpressions;
using Xunit;

namespace SqlExpressionsTests
{
    public class SqlExpressionResolverTest
    {
        public const string JSON = @"
{
  ""ExpressionType"": 1,
  ""ReturnType"": {
    ""Nullable"": true,
    ""SqlTypeEnum"": 0,
    ""TransferObjectId"": 12
  },
  ""Annotations"": [],
  ""From"": {
    ""ExpressionType"": 0,
    ""ReturnType"": {
      ""Nullable"": true,
      ""SqlTypeEnum"": 1,
      ""TransferObjectId"": 12
    },
    ""Alias"": ""My Table"",
    ""CallName"": ""Department"",
    ""Columns"": [
      {
        ""ExpressionType"": 2,
        ""ReturnType"": {
          ""Nullable"": true,
          ""SqlTypeEnum"": 1,
          ""TransferObjectId"": 12
        },
        ""Name"": ""Name"",
        ""Source"": {
          ""CallName"": ""My Table"",
          ""TransferObjectId"": 0
        },
        ""TransferObjectId"": 4
      },
      {
        ""ExpressionType"": 2,
        ""ReturnType"": {
          ""Nullable"": true,
          ""SqlTypeEnum"": 1,
          ""TransferObjectId"": 12
        },
        ""Name"": ""Administrator"",
        ""Source"": {
          ""CallName"": ""My Table"",
          ""TransferObjectId"": 0
        },
        ""TransferObjectId"": 4
      }
    ],
    ""TableName"": ""Department"",
    ""TransferObjectId"": 10
  },
  ""GroupBy"": [],
  ""Having"": null,
  ""OrderBy"": [],
  ""Select"": [
    {
      ""ExpressionType"": 2,
      ""ReturnType"": {
        ""Nullable"": true,
        ""SqlTypeEnum"": 1,
        ""TransferObjectId"": 12
      },
      ""Name"": ""Name"",
      ""Source"": {
        ""CallName"": ""My Table"",
        ""TransferObjectId"": 0
      },
      ""TransferObjectId"": 4
    },
    {
      ""ExpressionType"": 2,
      ""ReturnType"": {
        ""Nullable"": true,
        ""SqlTypeEnum"": 1,
        ""TransferObjectId"": 12
      },
      ""Name"": ""Administrator"",
      ""Source"": {
        ""CallName"": ""My Table"",
        ""TransferObjectId"": 0
      },
      ""TransferObjectId"": 4
    }
  ],
  ""Where"": null,
  ""Limit"": 5,
  ""TransferObjectId"": 9
}";

        [Fact]
        public void TestResolver()
        {
            var obj = JsonConvert.DeserializeObject<ExpandoObject>(JSON);
            var expression = SqlExpressionResolver.Resolve(obj);
            var sql = new SqlGenerator().GenerateSql(expression);
        }
    }
}
