using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class ReferenceUnitsOfMeasurement
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(30)] public string Unit { get; set; }
        [Required]
        [MaxLength(150)] public string Description { get; set; }
        private static ApplicationContext db = Context.Db;

        public ReferenceUnitsOfMeasurement()
        {

        }
        public ReferenceUnitsOfMeasurement(string Unit, string Description)
        {
            this.Unit = Unit;
            this.Description = Description;
        }

        public static ReferenceUnitsOfMeasurement GetUnitsById(int id)
        {
            return db.ReferenceUnitsOfMeasurement.First(s => s.ID == id);
        }
    }
}
