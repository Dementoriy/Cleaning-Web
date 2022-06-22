using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Npgsql;

namespace CleaningDLL.Entity
{
    public class Client : Human
    {
        public int ID { get; set; }
        [Required]
        public bool IsOldClient { get; set; }
        [MaxLength(50)] public string? Login { get; set; }
        [MaxLength(64)][MinLength(64)] public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Avatar { get; set; }
        private static ApplicationContext db = Context.Db;
        private static NpgsqlConnection npgsql = Context.npgsql;

        public Client()
        {

        }
        public Client(string Surname, string Name, string MiddleName, string PhoneNumber, bool IsOldClient, string? Login, string? Password, string? Email, string? Avatar)
            : base(Surname, Name, MiddleName, PhoneNumber)
        {
            this.IsOldClient = IsOldClient;
            this.Login = Login;
            this.Password = Password;
            this.Email = Email;
            this.Avatar = Avatar;
        }

        public override string GetFullName()
        {
            return "Клиент: " + base.GetFullName();
        }

        public static void ClientIsOld(int id)
        {
            try
            {
                Client oldClient = db.Client.FirstOrDefault(c => c.ID == id);
                oldClient.IsOldClient = true;
            }
            catch (Exception ex)
            {
                return ;
            }

        }
        public static Client GetClientByTelefon(string telefon)
        {
            try
            {
                return db.Client.FirstOrDefault(e => e.PhoneNumber == telefon);
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public static Client GetClientById(int id)
        {
            try
            {
                return db.Client.First(e => e.ID == id);
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public static bool ClientByTelefonIsNew(string telefon)
        {
            try
            {
                return !db.Client.Any(e => e.PhoneNumber == telefon);
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static Client GetClient(string login, string pass)
        {
            try
            {
                return db.Client.Where(e => e.Login == login && e.Password == pass).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
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
                        RoomType = a.RoomType.Type,
                        IsOldClient = c.IsOldClient
                    }).ToList();

        }
       
        public class ClientInfo
        {
            public int ID { get; set; }
            public string Surname { get; set; }
            public string Name { get; set; }
            public string? MiddleName { get; set; }
            public string? HouseNumber { get; set; }
            public string? CityDistrict { get; set; }
            public string? Settlement { get; set; }
            public string? Street { get; set; }
            public string? Block { get; set; }
            public string? ApartmentNumber { get; set; }
            public string? RoomType { get; set; }
            public bool IsOldClient { get; set; }
        }
        
        public static bool proverkaClientTelefon(string Telefon)
        {
            try
            {
                return db.Client.Any(a => a.PhoneNumber == Telefon);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static bool proverkaClientLogin(string login)
        {
            try
            {
                return db.Client.Any(a => a.Login == login);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update()
        {
            try
            {
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool Add(Client client)
        {
            var command = new NpgsqlCommand("INSERT INTO \"Client\" (\"Surname\",\"Name\",\"MiddleName\",\"PhoneNumber\", " +
                " \"IsOldClient\"  ) VALUES " +
                                            "(@Surname, @Name, @MiddleName, @PhoneNumber, @IsOldClient)", npgsql);
            NpgsqlParameter surnameParam = new NpgsqlParameter("@Surname", client.Surname);
            NpgsqlParameter nameParam = new NpgsqlParameter("@Name", client.Name);
            NpgsqlParameter middleNameParam = new NpgsqlParameter("@MiddleName", client.MiddleName);
            NpgsqlParameter telefonParam = new NpgsqlParameter("@PhoneNumber", client.PhoneNumber);
            NpgsqlParameter isOldParam = new NpgsqlParameter("@IsOldClient", client.IsOldClient);
            command.Parameters.Add(surnameParam);
            command.Parameters.Add(nameParam);
            command.Parameters.Add(middleNameParam);
            command.Parameters.Add(telefonParam);
            command.Parameters.Add(isOldParam);
            var query = command.ExecuteNonQuery();
            db.Entry(client).Reload();
            return query > 0;

        }

        public static Client? GetClientLogin(string login)
        {
            try
            {
                return db.Client.FirstOrDefault(c => c.Login == login);
            }
            catch(Exception ex)
            { 
                return null;
            }
        }

        internal static Client? GetClientAuth(string login, string pass)
        {
            try
            {
                return db.Client.FirstOrDefault(c => c.Login == login && c.Password == pass);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
