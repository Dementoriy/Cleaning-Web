using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class ReferenceUnitsOfMeasurement //Справочник единиц измерения
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(30)] public string Unit { get; set; }
        [Required]
        [MaxLength(150)] public string Description { get; set; }

        public ReferenceUnitsOfMeasurement()
        {

        }
        public ReferenceUnitsOfMeasurement(string Unit, string Description)
        {
            this.Unit = Unit;
            this.Description = Description;
        }
    }
}
