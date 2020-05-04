using System;
using System.Collections.Generic;
using System.Text;

namespace CarPoolingWebApiReact.Services.Services
{
    static class Extensions
    {
        public static string GenerateId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
