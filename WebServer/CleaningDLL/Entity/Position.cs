using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Position
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string NamePosition { get; set; }
        [Required]
        [MaxLength(150)] public string Description { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }

        private static ApplicationContext db = Context.Db;
        public Position()
        {

        }
        public Position(string NamePosition, string Description)
        {
            Employees = new List<Employee>();
            this.NamePosition = NamePosition;
            this.Description = Description;
        }
        public static Position GetByID(int id)
        {
            return db.Position.FirstOrDefault(d => d.ID == id);
        }
    }
}
