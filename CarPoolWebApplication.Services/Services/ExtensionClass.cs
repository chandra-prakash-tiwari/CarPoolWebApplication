using System;
using System.Collections.Generic;
using System.Text;

namespace CarPoolingWebApiReact.Services.Services
{
    static class ExtensionClass
    {
        public static string Id()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
