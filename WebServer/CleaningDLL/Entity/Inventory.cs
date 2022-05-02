using System;
using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class Inventory //Инвентарь
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string InventoryName { get; set; }
        [Required]
        [MaxLength(150)] public string Description { get; set; }
        [Required]
        public InventoryType InventoryType { get; set; }
        [Required]
        [MaxLength(50)] public string UseTime { get; set; }
        [Required]
        [MaxLength(50)] public string LifeTime { get; set; }
        [Required]
        public DateTime DateOfReceiving { get; set; }

        public Inventory()
        {

        }
        public Inventory(string InventoryName, string Description, InventoryType InventoryType, string UseTime, 
            string LifeTime, DateTime DateOfReceiving)
        {
            this.InventoryName = InventoryName;
            this.Description = Description;
            this.InventoryType = InventoryType;
            this.UseTime = UseTime;
            this.LifeTime = LifeTime;
            this.DateOfReceiving = DateOfReceiving;
        }
    }
}
