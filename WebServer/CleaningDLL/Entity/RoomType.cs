using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class RoomType
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public decimal Сoefficient { get; set; }
        private static ApplicationContext db = Context.Db;
        public RoomType(string type, decimal coefficient)
        {
            this.Type = type;
            this.Сoefficient = coefficient;
        }
        public RoomType()
        {
        }
        public static RoomType GetСoefficientByType(string type)
        {

            try
            {
                if (type != "")
                {
                    return db.RoomType.First(e => e.Type == type);

                }
                else return db.RoomType.First(e => e.Type == "Квартира");
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static List<string> GetRoomType()
        {

            try
            {
                return db.RoomType.Select(c => c.Type).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static RoomType GetRoomTypeByName(string name)
        {

            try
            {
                return db.RoomType.First(e => e.Type == name);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
