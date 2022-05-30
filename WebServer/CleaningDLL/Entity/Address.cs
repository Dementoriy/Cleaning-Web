using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Address
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
        [Required]
        public RoomType RoomType { get; set; }
        [Required]
        public string AddressName { get; set; }
        public string FullAddress { get; set; }
        public bool CurrentAddress { get; set; }
        private static ApplicationContext db = Context.Db;
        public Address()
        {

        }
        public Address(string? CityDistrict, string? Settlement, string Street, string HouseNumber, string? Block, 
            string? ApartmentNumber, RoomType RoomType, string AddressName, string FullAddress, bool CurrentAddress)
        {
            this.CityDistrict = CityDistrict;
            this.Settlement = Settlement;
            this.Street = Street;
            this.HouseNumber = HouseNumber;
            this.Block = Block;
            this.ApartmentNumber = ApartmentNumber;
            this.RoomType = RoomType;
            this.AddressName = AddressName;
            this.FullAddress = FullAddress;
            this.CurrentAddress = CurrentAddress;
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
            str += $"ул.{Street} {HouseNumber}. ";
            int x = str.Length - 2;
            if (Block != "" && Block != null)
            {
                str = str.Remove(x);
                str += $", к.{Block}, ";
            }
            if (ApartmentNumber != "" && ApartmentNumber != null)
            {
                str = str.Remove(x);
                str += $", кв.{ApartmentNumber}.";
            }
            return str;
        }
        public static List<Address> GetAddress()
        {
            return db.Address.ToList();
        }
        public static Address GetAddress(string cityDistrict, string settlement, string street, 
            string houseNumber, string block, string apartmentNumber)
        {
            return db.Address.FirstOrDefault(e => e.CityDistrict == cityDistrict && e.Settlement == settlement && e.Street == street
            && e.HouseNumber == houseNumber && e.Block == block && e.ApartmentNumber == apartmentNumber);
        }
        public static bool CheckAddress(string cityDistrict, string settlement, string street,
            string houseNumber, string block, string apartmentNumber)
        {
            return !db.Address.Any(e => e.CityDistrict == cityDistrict && e.Settlement == settlement && e.Street == street
            && e.HouseNumber == houseNumber && e.Block == block && e.ApartmentNumber == apartmentNumber);
        }

        public static void Add(Address address)
        {
            db.Address.Add(address);
            db.SaveChanges();
        }
    }
}
