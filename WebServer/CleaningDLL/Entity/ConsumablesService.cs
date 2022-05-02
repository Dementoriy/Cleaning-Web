using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class ConsumablesService //Расходники услуги
    {
        public int ID { get; set; }
        [Required]
        public Service Service { get; set; }
        [Required]
        public ConsumptionRate ConsumptionRate { get; set; }

        public ConsumablesService()
        {

        }
        public ConsumablesService(Service Service, ConsumptionRate ConsumptionRate)
        {
            this.Service = Service;
            this.ConsumptionRate = ConsumptionRate;
        }
    }
}
