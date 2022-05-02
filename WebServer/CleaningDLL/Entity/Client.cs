using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Client : Human //Клиент
    {
        public int ID { get; set; }
        [Required]
        public bool IsOldClient { get; set; }
        [MaxLength(50)] public string? Login { get; set; }
        [MaxLength(64)][MinLength(64)] public string? Password { get; set; }
        public string? Email { get; set; }
        private static ApplicationContext db = Context.Db;

        public Client()
        {

        }
        public Client(string Surname, string Name, string MiddleName, string PhoneNumber, bool IsOldClient, string? Login, string? Password, string? Email)
            : base(Surname, Name, MiddleName, PhoneNumber)
        {
            this.IsOldClient = IsOldClient;
            this.Login = Login;
            this.Password = Password;
            this.Email = Email;
        }

        public override string GetFullName()
        {
            return "Клиент: " + base.GetFullName();
        }

        public static void ClientIsOld(int id)
        {
            Client oldClient =  db.Client.Where(c => c.ID == id).FirstOrDefault();
            oldClient.IsOldClient = true;
        }
        public static Client GetClientByTelefon(string telefon)
        {
            return db.Client.Where(e => e.PhoneNumber == telefon).FirstOrDefault();
        }
        public static bool ClientByTelefonIsNew(string telefon)
        {
            return !db.Client.Where(e => e.PhoneNumber == telefon).Any();
        }
        public bool AddClient()
        {
            try
            {
                db.Client.Add(this);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        

        public static List<ClientInfo> GetClientInfo(string Telefon)
        {
            return (from c in db.Client
                    where c.PhoneNumber == Telefon
                    join o in db.Order on c.ID equals o.Client.ID
                    join a in db.Address on o.Address.ID equals a.ID
                    select new ClientInfo()
                    {
                        ID = c.ID,
                        Surname = c.Surname,
                        Name = c.Name,
                        MiddleName = c.MiddleName,
                        CityDistrict = a.CityDistrict,
                        Settlement = a.Settlement,
                        Street = a.Street,
                        HouseNumber = a.HouseNumber,
                        Block = a.Block,
                        ApartmentNumber = a.ApartmentNumber,
                        IsOldClient = c.IsOldClient
                    }).ToList();
        }
        public class ClientInfo
        {
            public int ID { get; set; }
            public string Surname { get; set; }
            public string Name { get; set; }
            public string MiddleName { get; set; }
            public string HouseNumber { get; set; }
            public string CityDistrict { get; set; }
            public string Settlement { get; set; }
            public string Street { get; set; }
            public string Block { get; set; }
            public string ApartmentNumber { get; set; }
            public bool IsOldClient { get; set; }
        }
        
        public static bool proverkaClientTelefon(string Telefon)
        {
                return db.Client.Where(a => a.PhoneNumber == Telefon).Any();
        }
    }
}
