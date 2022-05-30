using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        private static ApplicationContext db = Context.Db;

        public ClientAddresses(Address address, Client client)
        {
            this.Address = address;
            this.Client = client;
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
        public static List<ClientAddresses> GetClientAddresses()
        {
            return db.ClientAddresses.ToList();
        }
        public static void Add(ClientAddresses clientAddresses)
        {
            db.ClientAddresses.Add(clientAddresses);
            db.SaveChanges();
        }
        public static IEnumerable<Address> GetClientAddressesById(int id)
        {
            return db.ClientAddresses.Include(c => c.Client).Include(c => c.Address).Where(a => a.Client.ID == id && a.Address.CurrentAddress == true).Select(x => x.Address);
        }
    }
}
