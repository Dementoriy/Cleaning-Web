using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Service
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(100)] public string ServiceName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public InventoryType? InventoryType { get; set; }
        public int InventoryTypeID { get; set; }
        [Required]
        public int Time { get; set; }
        [Required]
        public ReferenceUnitsOfMeasurement Units { get; set; }
        public int UnitsID { get; set; }
        public string? Image { get; set; }
        public bool IsMain { get; set; }

        public Service()
        {

        }
        public Service(string ServiceName, string Description, decimal Price, int InventoryTypeID, int Time, string? Image, bool IsMain)
        {
            this.ServiceName = ServiceName;
            this.Description = Description;
            this.Price = Price;
            this.InventoryTypeID = InventoryTypeID;
            this.Time = Time;
            this.Image = Image;
            this.IsMain = IsMain;
        }

        private static ApplicationContext db = Context.Db;

        public static int GetIdService(string str)
        {
            int idService;
            Service service = db.Service.FirstOrDefault(s => s.ServiceName == str);
            idService = service.ID;
            return idService;
        }

        public static Service GetServiceById(int idService)
        {
            return db.Service.FirstOrDefault(s => s.ID == idService);
        }
        public static List<Service> GetService()
        {
            return db.Service.Include(u => u.Units).OrderBy(x => x.ID).ToList();
        }
        
    }
}
