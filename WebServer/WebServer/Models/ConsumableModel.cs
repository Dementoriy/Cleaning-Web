using CleaningDLL.Entity;

namespace WebServer.Models
{
    public class ConsumableModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ConsumableModel(int ID, string Name, string Description)
        {
            this.ID = ID;
            this.Name = Name;
            this.Description = Description;
        }
    }
}
