using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/my-cleaning")]
    public class GetOrderHandler : RequestHandler
    {
        [Get("get")]
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
            List<Order> orders = Order.GetClientOrder(client.ID);
            
            Send(new AnswerModel(true, new { objects = OrderModel.GetOrderModels(orders) }, null, null));
        }

        [Get("get-by-id")]
        public void GetOrderById()
        {
            if(Params.TryGetValue("id", out var id))
            {
                var order = Order.GetOrderById(Int32.Parse(id));
                
                List<Order> orders = new List<Order>();
                orders.Add(order);
                Send(new AnswerModel(true, new { order = OrderModel.GetOrderModels(orders).First() }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }

        [Post("add-rating")]
        public void addRating()
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
            var body = Bind<OrderModel>();
            Order order = Order.GetOrderById(body.ID);
            if (body.Rating == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            if (body.Rating != order.Rating)
            {
                order.Rating = body.Rating;
                order.Update();
            }

            List<Order> orders = new List<Order>();
            orders.Add(order);

            Send(new AnswerModel(true, new { order = OrderModel.GetOrderModels(orders).First() }, null, null));
            //Send(new AnswerModel(true, new
            //{
            //    rating = new OrderModel(order.ID, order.Status, order.Address, order.Date, order.FinalPrice, order.ApproximateTime, 
            //    order.Comment, order.Rating, order.ProvidedServices, order.Consumables)

            //}, null, null));
        }
    }
}
