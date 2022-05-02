using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Address //Адрес
    {
        public int ID { get; set; }
        public string? CityDistrict { get; set; }
        public string? Settlement { get; set; }
        [Required]
        [MaxLength(100)] public string Street { get; set; }

        [Required]
        [MaxLength(10)] public string HouseNumber { get; set; }
        [MaxLength(10)] public string? Block { get; set; }
        [MaxLength(10)] public string? ApartmentNumber { get; set; }
        //[Required]
        //public RoomType RoomType { get; set; }
        private static ApplicationContext db = Context.Db;
        public Address()
        {

        }
        public Address(string? CityDistrict, string? Settlement, string Street, string HouseNumber, string? Block, 
            string? ApartmentNumber/*, RoomType RoomType*/)
        {
            this.CityDistrict = CityDistrict;
            this.Settlement = Settlement;
            this.Street = Street;
            this.HouseNumber = HouseNumber;
            this.Block = Block;
            this.ApartmentNumber = ApartmentNumber;
            //this.RoomType = RoomType;
        }
        public string AddAddress()
        {
            string str = "";
            if (CityDistrict != "" && CityDistrict != null)
            {
                str += CityDistrict + ", ";
            }
            if (Settlement != "" && Settlement != null)
            {
                str += Settlement + ", ";
            }
            str += $"ул.{Street}, д.{HouseNumber}. ";
            int x = str.Length - 2;
            if (Block != "")
            {
                str = str.Remove(x);
                str += $", к.{Block}, ";
            }
            if (ApartmentNumber != "")
            {
                str = str.Remove(x);
                str += $", кв.{ApartmentNumber}.";
            }
            return str;
        }
        public static Address GetAddress(string cityDistrict, string settlement, string street, 
            string houseNumber, string block, string apartmentNumber)
        {
            return db.Address.Where(e => e.CityDistrict == cityDistrict && e.Settlement == settlement && e.Street == street
            && e.HouseNumber == houseNumber && e.Block == block && e.ApartmentNumber == apartmentNumber).ToList()[0];
        }
        public static bool CheckAddress(string cityDistrict, string settlement, string street,
            string houseNumber, string block, string apartmentNumber)
        {
            return !db.Address.Where(e => e.CityDistrict == cityDistrict && e.Settlement == settlement && e.Street == street
            && e.HouseNumber == houseNumber && e.Block == block && e.ApartmentNumber == apartmentNumber).Any();
        }
    }
}
