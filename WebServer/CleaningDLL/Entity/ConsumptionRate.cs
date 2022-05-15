using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class ConsumptionRate
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(150)] public string Consumption { get; set; }
        [Required]
        public Consumable Consumable { get; set; }
        [Required]
        public ReferenceUnitsOfMeasurement ReferenceUnitsOfMeasurement { get; set; }
        public ConsumptionRate()
        {

        }
        public ConsumptionRate(string Consumption, Consumable Consumable, ReferenceUnitsOfMeasurement ReferenceUnitsOfMeasurement)
        {
            this.Consumption = Consumption;
            this.Consumable = Consumable;
            this.ReferenceUnitsOfMeasurement = ReferenceUnitsOfMeasurement;
        }
    }
}
