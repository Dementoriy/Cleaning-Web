using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class BrigadeInventory
    {
        public int ID { get; set; }
        [Required]
        public Brigade Brigade { get; set; }
        [Required]
        public Inventory Inventory { get; set; }

        public BrigadeInventory()
        {

        }
        public BrigadeInventory(Brigade Brigade, Inventory Inventory)
        {
            this.Brigade = Brigade;
            this.Inventory = Inventory;
        }
    }
}
