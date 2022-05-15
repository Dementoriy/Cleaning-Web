using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class ProvidedService
    {
        public int ID { get; set; }
        [Required]
        public Order Order { get; set; }
        public int OrderID { get; set; }
        [Required]
        public Service Service { get; set; }
        public int ServiceID { get; set; }
        [Required]
        public int Amount { get; set; }

        public ProvidedService()
        {

        }
        public ProvidedService(Order Order, Service Service, int Amount)
        {
            this.Order = Order;
            this.Service = Service;
            this.Amount = Amount;
        }

        private static ApplicationContext db = Context.Db;

        public static List<ProvidedService> GetPSByOrder(int id)
        {
            return (from ps in db.ProvidedService
                    where ps.OrderID == id
                    select ps
                    ).ToList();
        }
        public static void Add(ProvidedService providedService)
        {
            db.ProvidedService.Add(providedService);
            db.SaveChanges();
        }
    }
}
