using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class TimeModel
    {
        public int timeValue { get; set; }

        public TimeModel()
        {
        }
        public TimeModel(int timeValue)
        {
            this.timeValue = timeValue;
        }
    }
}
