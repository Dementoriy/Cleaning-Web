using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Brigade //Бригада
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(10)] public string SmenaNumber { get; set; }

        private static ApplicationContext db = Context.Db;

        public Brigade()
        {

        }
        public Brigade(string Smena_Number)
        {
            this.SmenaNumber = Smena_Number;
        }
        public static Brigade GetBrigadeByID(int id)
        {
            return db.Brigade.Where(e => e.ID == id).FirstOrDefault();
        }
    }
}
