using CleaningDLL.Entity;

namespace WebServer.Models
{
    public class AddressModel
    {
        public int ID { get; set; }
        public string RoomType { get; set; }
        public decimal Сoefficient { get; set; }
        public string AddressName { get; set; }
        public string FullAddress { get; set; }
        public bool CurrentAddress { get; set; }

        public AddressModel(int ID, string RoomType, decimal Сoefficient, string AddressName, string FullAddress, bool CurrentAddress)
        {
            this.ID = ID;
            this.RoomType = RoomType;
            this.Сoefficient = Сoefficient;
            this.AddressName = AddressName;
            this.FullAddress = FullAddress;
            this.CurrentAddress = CurrentAddress;
        }
    }
}
