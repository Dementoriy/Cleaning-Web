using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace CleaningDLL.Entity
{
    public class Order 
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string Status { get; set; }
        [Required]
        public Client Client { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Address Address { get; set; }
        [Required]
        public Brigade Brigade { get; set; }
        public int BrigadeID { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public int FinalPrice { get; set; }
        public int ApproximateTime { get; set; }
        public string? Comment { get; set; }
        public Contract? Contract { get; set; }
        public int ContractID { get; set; }
        public int? Rating { get; set; }

        public Order()
        {
            
        }
        public Order(string Status, Client Client, Employee Employee, Address Address, Brigade Brigade, DateTime Date,
            int FinalPrice, int ApproximateTime, string? Comment, int? Rating)
        {
            this.Status = Status;
            this.Client = Client;
            this.Employee = Employee;
            this.Address = Address;
            this.Brigade = Brigade;
            this.Date = Date;
            this.FinalPrice = FinalPrice;
            this.ApproximateTime = ApproximateTime;
            this.Comment = Comment;
            this.Contract = new Contract( Employee, Client, DateTime.Now);
            this.Rating = Rating;
        }

        private static ApplicationContext db = Context.Db;
        private static NpgsqlConnection npgsql = Context.npgsql;

        public static bool IsOldClienCheck(int clientId)
        {
            try
            {
                List<Order> ordersByClientID = db.Order.Where(o => o.Client.ID == clientId && o.Status == EnumStatus.GetDescription(EnumStatus.Status.сompleted)).ToList();
                if (ordersByClientID.Count >= 3)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public static Order GetOrderById(int id)
        {

            try
            {
                return db.Order.FirstOrDefault(e => e.ID == id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static List<OrderInfo> GetOrderInfo()
        {
            try
            {
            return (from o in db.Order
                join a in db.Address on o.Address.ID equals a.ID
                select new OrderInfo()

                {
                    ID = o.ID,
                    Time = o.Date.ToString("t"),
                    Date = o.Date.ToString("d"),
                    Brigade = o.Brigade.ID,
                    Status = o.Status,
                    Client = o.Client.AddFIO(),
                    Address = a.AddAddress(),
                    Telefone = o.Client.PhoneNumber,
                    FinalPrice = o.FinalPrice,
                    ApproximateTime = GetTimeByInt(o.ApproximateTime).ToString()
                }).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
        public class OrderInfo
        {
            public int ID { get; set; }
            public string Date { get; set; }
            public string Time { get; set; }
            public string Address { get; set; }
            public string Status { get; set; }
            public int Brigade { get; set; }
            public string Telefone { get; set; }
            public string Client { get; set; }
            public string ApproximateTime { get; set; }
            public int FinalPrice { get; set; }
        }
        public static string GetPriceByInt(int p)
        {
            return (p + " ₽");
        }
        public static int GetPriceByString(string p)
        {
            int price = Convert.ToInt32(p.Trim(new Char[] { ' ', '₽' }));
            return price;
        }
        public static string GetTimeByInt(int t)
        {
            t = t / 60;
            int h = t / 60;
            int m = t % 60;
            return (h + "ч. " + m + "мин.");
        }
        public static bool UpdateOrder(Order order)
        {
            var command = new NpgsqlCommand("UPDATE \"Order\" SET " +
                                            "\"Status\" = @status, \"BrigadeID\" = @brigade, " +
                                            "\"Date\" = @date, \"FinalPrice\" = @price, " +
                                            "\"Comment\" = @comment " +
                                            "WHERE \"ID\" = @orderId", npgsql);
            NpgsqlParameter orderParam = new NpgsqlParameter("@orderId", order.ID);
            NpgsqlParameter statusParam = new NpgsqlParameter("@status", order.Status);
            NpgsqlParameter brigadeParam = new NpgsqlParameter("@brigade", order.BrigadeID);
            NpgsqlParameter dateParam = new NpgsqlParameter("@date", order.Date);
            NpgsqlParameter priceParam = new NpgsqlParameter("@price", order.FinalPrice);
            NpgsqlParameter commentParam = new NpgsqlParameter("@comment", order.Comment);
            command.Parameters.Add(orderParam);
            command.Parameters.Add(statusParam);
            command.Parameters.Add(brigadeParam);
            command.Parameters.Add(dateParam);
            command.Parameters.Add(priceParam);
            command.Parameters.Add(commentParam);
            var query = command.ExecuteNonQuery();
            db.Entry(order).Reload();
            return query > 0;
        }
        public static void Add(Order order)
        {

            try
            {
                db.Order.Add(order);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return ;
            }
        }
        public static void Update(Order order)
        {

            try
            {
                db.Order.Update(order);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return ;
            }
        }
        public static List<Order> GetOrder()
        {

            try
            {
                return db.Order.Include(a => a.Address).Include(c => c.Client).Include(b => b.Brigade).Include(e => e.Employee).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static List<Order> GetClientOrder(int id)
        {
            try
            {
                return db.Order.Include(a => a.Address).ThenInclude(a => a.RoomType).Include(c => c.Client).Include(b => b.Brigade).Include(e => e.Employee).Where(a => a.Client.ID == id).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
