using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class ClientAddresses
    {
        public int ID { get; set; }
        [Required]
        public Address Address { get; set; }
        [Required]
        public Client Client { get; set; }
        public string Name { get; set; }
        private static ApplicationContext db = Context.Db;

        public ClientAddresses(Address address, Client client, string Name)
        {
            this.Address = address;
            this.Client = client;
            this.Name = Name;
        }

        public ClientAddresses()
        {

        }
        public static ClientAddresses GetClientAddresses(Address address, Client client)
        {
            return db.ClientAddresses.FirstOrDefault(e => e.Address == address && e.Client == client);
        }
        public static bool CheckClientAddresses(Address address, Client client)
        {
            return !db.ClientAddresses.Any(e => e.Address == address && e.Client == client);
        }

        public static void Add(ClientAddresses clientAddresses)
        {
            db.ClientAddresses.Add(clientAddresses);
            db.SaveChanges();
        }
    }
}
