using Microsoft.AspNetCore.Mvc.Filters;
using System;
using Microsoft.AspNetCore.Mvc;

namespace Website.Attributes
{
    /// <summary>
    /// Filter handling InvalidCastException
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.ExceptionFilterAttribute" />
    public class ParseExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is InvalidCastException)
            {
                context.HttpContext.Response.StatusCode = 400;
                context.Result = new BadRequestObjectResult("Incorrect argument."
                    + Environment.NewLine + context.Exception.Message);
                context.Exception = null;
            }
        }
    }
}
