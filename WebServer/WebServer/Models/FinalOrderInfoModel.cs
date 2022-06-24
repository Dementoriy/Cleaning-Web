using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class FinalOrderInfoModel
    {
        public AddressModel address { get; set; }
        public string dateTime { get; set; }
        public string dateTimeEnd { get; set; }
        public string comment { get; set; }
        public int periodicity { get; set; }
        public ServiceModel service { get; set; }
        public int square { get; set; }
        public int price { get; set; }
        public string time { get; set; }
        public int timeValue { get; set; }
        public ServiceModel[] dopService { get; set; }
        public string[] amount { get; set; }
        public int? count { get; set; }
    }
}
