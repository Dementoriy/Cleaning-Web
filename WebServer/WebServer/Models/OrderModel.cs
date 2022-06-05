using CleaningDLL.Entity;

namespace WebServer.Models;

public class OrderModel
{
    public int ID { get; set; }
    public string Status { get; set; }
    public AddressModel Address { get; set; } = new AddressModel();
    public DateTime Date { get; set; }
    public int FinalPrice { get; set; }
    public string ApproximateTime { get; set; }
    public string? Comment { get; set; }
    public int? Rating { get; set; }
    public List<ProvidedServiceModel> ProvidedServices { get; set; } = new List<ProvidedServiceModel>();
    public class ProvidedServiceModel
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public ServiceModel Service { get; set; }

    }
    public static List<OrderModel> GetOrderModels(List<Order> orders)
    {
        var newOrders = new List<OrderModel>();
        foreach (var order in orders)
        {
            var newOrder = new OrderModel
            {
                ID = order.ID,
                Status = order.Status,
                FinalPrice = order.FinalPrice,
                ApproximateTime = Order.GetTimeByInt(order.ApproximateTime),
                Comment = order.Comment,
                Rating = order.Rating,
                Address = new AddressModel
                {
                    ID = order.Address.ID,
                    CityDistrict = order.Address.CityDistrict,
                    Settlement = order.Address.Settlement,
                    Street = order.Address.Street,
                    HouseNumber = order.Address.HouseNumber,
                    Block = order.Address.Block,
                    ApartmentNumber = order.Address.ApartmentNumber,
                    RoomType = order.Address.RoomType.Type,
                    Сoefficient = order.Address.RoomType.Сoefficient,
                    AddressName = order.Address.AddressName,
                    FullAddress = order.Address.FullAddress,
                    CurrentAddress = order.Address.CurrentAddress
                },
            };
            foreach (var service in ProvidedService.GetProvidedServicesByOrderId(order.ID))
            {
                newOrder.ProvidedServices.Add(new ProvidedServiceModel
                {
                    Id = service.ID,
                    Amount = service.Amount,
                    Service = new ServiceModel
                    {
                        ID = service.Service.ID,
                        ServiceName = service.Service.ServiceName,
                        Description = service.Service.Description,
                        Price = service.Service.Price,
                        Time = service.Service.Time,
                        UnitsTitle = service.Service.Units.Unit,
                        Image = service.Service.Image,
                        IsMain = service.Service.IsMain,
                        ApproximateTime = service.Service.ApproximateTime
                    }
                });
            }
            newOrders.Add(newOrder);
        }
        return newOrders;
    }
}
