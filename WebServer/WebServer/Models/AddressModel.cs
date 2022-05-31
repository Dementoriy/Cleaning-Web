using CleaningDLL.Entity;

namespace WebServer.Models
{
    public class AddressModel
    {
        public int ID { get; set; }
        public string? CityDistrict { get; set; }
        public string? Settlement { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string? Block { get; set; }
        public string? ApartmentNumber { get; set; }
        public string RoomType { get; set; }
        public decimal Сoefficient { get; set; }
        public string AddressName { get; set; }
        public string FullAddress { get; set; }
        public bool CurrentAddress { get; set; }
    }
}
