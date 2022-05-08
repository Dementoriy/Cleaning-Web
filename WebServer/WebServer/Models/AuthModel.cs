using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class AuthModel
    {
        public string login { get; set; }
        public string password { get; set; }

        public static bool Check(AuthModel? model)
        {
            return model is null || string.IsNullOrEmpty(model.login) || string.IsNullOrEmpty(model.password);
        }
    }

}
