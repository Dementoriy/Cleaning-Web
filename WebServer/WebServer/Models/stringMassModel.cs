using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class stringMassModel
    {
        public string[] stringMass { get; set; }

        public stringMassModel(string[] stringMass)
        {
            this.stringMass = stringMass;

        }
    }
}
