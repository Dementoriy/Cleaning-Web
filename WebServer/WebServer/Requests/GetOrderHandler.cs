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

            if (!orders.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }

            Send(new AnswerModel(true, new { orders = orders }, null, null));
        }
    }
}
