using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class RegModel
    {
        public string surname { get; set; }
        public string name { get; set; }
        public string middlename { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public string password { get; set; }

        public static bool Check(RegModel? model)
        {
            return model is null || string.IsNullOrEmpty(model.surname) || string.IsNullOrEmpty(model.name)
                || string.IsNullOrEmpty(model.phone) || string.IsNullOrEmpty(model.email)
                || string.IsNullOrEmpty(model.login) || string.IsNullOrEmpty(model.password);
        }
    }

}
