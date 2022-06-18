using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/filters")]
    public class GetFiltersHandler : RequestHandler
    {
        [Get("get")]
        public void GetFilters()
        
        {
            if (!Headers.TryGetValue("Access-Token", out var token) || !TokenWorker.CheckToken(token))
            {
                
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            var client = TokenWorker.GetClientByToken(token);
            if (client is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            IEnumerable<Address> addresses = ClientAddresses.GetClientAddressesById(client.ID);

            List<Consumable> consumables = Consumable.GetConsumable();

            if (!consumables.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }
            List<ConsumableModel> consumableModels = new List<ConsumableModel>();
            foreach(var consumablee in consumables)
            {
                ConsumableModel consumableModel = new ConsumableModel(consumablee.ID, consumablee.ConsumableName, consumablee.Description);
                consumableModels.Add(consumableModel);
            }

            Send(new AnswerModel(true, new { addresses = addresses, consumables  = consumableModels }, null, null));

        }

        
        [Post("get-order")]
        public void GetOrder()
        {
            if (!Headers.TryGetValue("Access-Token", out var token) || !TokenWorker.CheckToken(token))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            var client = TokenWorker.GetClientByToken(token);
            if (client is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            var body = Bind<FiltersStateModal>();

            if (body.address == null || body.dateOt == null || body.dateDo == null) 
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            List<Address> addresses = new List<Address>();

            foreach(var address in body.address)
            {
                Address am = Address.GetAddressById(address.ID);
                addresses.Add(am);
            }


            DateTime dateTimeOt = DateTime.Parse(body.dateOt);
            DateTime dateTimeDo = DateTime.Parse(body.dateDo);

            List<Order> filteredOrders = Order.GetFilteredOrders(client.ID, addresses, dateTimeOt, dateTimeDo);

            List<OrderModel> orderModels = OrderModel.GetOrderModels(filteredOrders);

            if(body.consumables == null)
            {
                Send(new AnswerModel(true, new { objects = orderModels }, null, null));
                return;
            }

            List<OrderModel> filteredOrderModels = OrderModel.GetFilteredOrderModels(body.consumables, orderModels);

            Send(new AnswerModel(true, new { objects = filteredOrderModels }, null, null));

        }
    }
}
