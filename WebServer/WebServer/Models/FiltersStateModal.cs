using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class FiltersStateModal
    {
        public List<AddressModel> address { get; set; } = new List<AddressModel>();
        public List<ConsumableModel> consumables { get; set; } = new List<ConsumableModel>();
        public string dateOt { get; set; }
        public string dateDo { get; set; }
    }
}
