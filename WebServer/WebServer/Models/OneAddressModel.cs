using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class OneAddressModel
    {
        public string selectedAddress { get; set; }

        public OneAddressModel(string selectedAddress)
        {
            this.selectedAddress = selectedAddress;

        }
    }
}
