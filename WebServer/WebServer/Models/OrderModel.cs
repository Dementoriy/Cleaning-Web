using CleaningDLL.Entity;

namespace WebServer.Models;

public class OrderModel
{
    public int ID { get; set; }
    public string Status { get; set; }
    public AddressModel Address { get; set; }
    public string Date { get; set; }
    public int FinalPrice { get; set; }
    public string ApproximateTime { get; set; }
    public string? Comment { get; set; }
    public int? Rating { get; set; }
    public List<ProvidedServiceModel> ProvidedServices { get; set; } = new List<ProvidedServiceModel>();
    public List<ConsumableModel> Consumables { get; set; } = new List<ConsumableModel>();
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
                Date = (order.Date.ToShortTimeString() + " " + order.Date.ToShortDateString()).ToString(),
                FinalPrice = order.FinalPrice,
                ApproximateTime = Order.GetTimeByInt(order.ApproximateTime),
                Comment = order.Comment,
                Rating = order.Rating,
                Address = new AddressModel(order.Address.ID, order.Address.RoomType.Type, order.Address.RoomType.Сoefficient, order.Address.AddressName,
                order.Address.FullAddress, order.Address.CurrentAddress)
            };
            foreach (var service in ProvidedService.GetProvidedServicesByOrderId(order.ID))
            {
                newOrder.ProvidedServices.Add(new ProvidedServiceModel
                {
                    Id = service.ID,
                    Amount = service.Amount,
                    Service = new ServiceModel(service.Service.ID, service.Service.ServiceName, service.Service.Description, 
                    service.Service.Price, service.Service.Time, service.Service.Units.Unit, service.Service.Image, service.Service.IsMain, service.Service.ApproximateTime, true)
                });
                foreach (var consemable in Consumable.GetConsumableByService(service.Service.ID))
                {
                    var tmpConsumable = new ConsumableModel(consemable.ID, consemable.ConsumableName, consemable.Description);
                    if(!newOrder.Consumables.Any(x => x.Name == consemable.ConsumableName))
                        newOrder.Consumables.Add(tmpConsumable);
                }
            };
            
            newOrders.Add(newOrder);
        }
        return newOrders;
    }

    public static List<OrderModel> GetFilteredOrderModels(List<ConsumableModel> consumables, List<OrderModel> orderModels)
    {
        List<OrderModel> finalOrderModels = new List<OrderModel>();

        foreach(var order in orderModels)
        {
            foreach(var consumable in consumables)
            {
                if (order.Consumables.Any(c => c.Name == consumable.Name))
                    finalOrderModels.Add(order);
            }
        }
        return finalOrderModels;
    }
}
