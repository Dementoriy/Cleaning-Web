using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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
        private static ApplicationContext db = Context.Db;

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

        public static List<Consumable> GetConsumable()
        {
            try
            {
                return db.Consumable.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static List<Consumable> GetConsumableByService(int id)
        {
            try
            {
                return (from c in db.Consumable
                        join cr in db.ConsumptionRate on c.ID equals cr.Consumable.ID
                        join cs in db.ConsumablesService on cr.ID equals cs.ConsumptionRate.ID
                        where cs.Service.ID == id
                        orderby c.ID
                        select new Consumable()
                        {
                            ID = c.ID,
                            ConsumableName = c.ConsumableName,
                            Description = c.Description
                        }).Distinct().ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
