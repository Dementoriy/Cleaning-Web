﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class ServiceModel
    {
        public int ID { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
        public string UnitsTitle { get; set; }
        public string? Image { get; set; }
        public bool IsMain { get; set; }
        public string ApproximateTime { get; set; }
    }
}
