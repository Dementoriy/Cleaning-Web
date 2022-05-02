using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class InventoryType //Тип инвентаря
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(150)] public string Name { get; set; }

        public InventoryType()
        {

        }
        public InventoryType(string Name)
        {
            this.Name = Name;
        }
    }
}
