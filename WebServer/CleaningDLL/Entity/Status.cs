using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Status
    {
        public int ID { get; set; }
        [Required]
        public string status { get; set; }

        public Status()
        {

        }
        public Status(string status)
        {
            this.status = status;
        }
    }
}
