﻿using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class Consumable
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string ConsumableName { get; set; }
        [Required]
        [MaxLength(150)] public string Description { get; set; }
        [Required]
        public decimal CurrentPrice { get; set; }
        [Required]
        public ReferenceUnitsOfMeasurement ReferenceUnitsOfMeasurement { get; set; }
        public int ReferenceUnitsOfMeasurementID { get; set; }
        [Required]
        public int Amount { get; set; }

        public Consumable()
        {

        }
        public Consumable(string ConsumableName, string Description, decimal CurrentPrice, int ReferenceUnitsOfMeasurementID, int Amount)
        {
            this.ConsumableName = ConsumableName;
            this.Description = Description;
            this.CurrentPrice = CurrentPrice;
            this.ReferenceUnitsOfMeasurementID = ReferenceUnitsOfMeasurementID;
            this.Amount = Amount;
        }
    }
}
