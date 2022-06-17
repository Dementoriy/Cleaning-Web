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

            try
            {
                return db.ClientAddresses.FirstOrDefault(e => e.Address == address && e.Client == client);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static bool CheckClientAddresses(Address address, Client client)
        {

            try
            {
                return !db.ClientAddresses.Any(e => e.Address == address && e.Client == client);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static List<ClientAddresses> GetClientAddresses()
        {

            try
            {
                return db.ClientAddresses.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static void Add(ClientAddresses clientAddresses)
        {
            
            try
            {
                db.ClientAddresses.Add(clientAddresses);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return ;
            }
        }
        public static IEnumerable<Address> GetClientAddressesById(int id)
        {
            try
            {
                return db.ClientAddresses.Include(c => c.Client).Include(c => c.Address).ThenInclude(a => a.RoomType).Where(a => a.Client.ID == id && a.Address.CurrentAddress == true).Select(x => x.Address);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static IEnumerable<Address> GetClientAddressesByFullAddress(string fullAddress)
        {
            try
            {
                return db.ClientAddresses.Include(c => c.Client).Include(c => c.Address).ThenInclude(a => a.RoomType).Where(a => a.Address.FullAddress == fullAddress).Select(x => x.Address);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
