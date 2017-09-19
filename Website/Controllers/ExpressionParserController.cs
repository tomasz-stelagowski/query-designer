using Microsoft.AspNetCore.Mvc;
using System;
using System.Dynamic;
using Website.Attributes;


namespace Website.Controllers
{
    /// <summary>
    /// Class ressponsible for pasing JSON metadata into SQL query
    /// </summary>
    [Route("api/[controller]")]
    public class ExpressionParserController : Controller
    {
        /// <summary>
        /// Method parsing metadata into SQL query
        /// </summary>
        /// <param name="expando">ExpandoObject representing JSON metadata</param>
        /// <returns>SQL query</returns>
        // GET: api/values
        [Route("parse")]
        [HttpPost]
        [ParseExceptionFilter]
        public string Parse([FromBody]ExpandoObject expando)
        {
            try
            {
                var query = SqlExpressions.SqlExpressionResolver.Resolve(expando);
                if (query == null) throw new ArgumentException("Incorrect JSON argument");
                var sql = new SqlExpressions.SqlGenerator().GenerateSql(query);
                return sql;
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return ex.Message;
            }
        }
    }
}
