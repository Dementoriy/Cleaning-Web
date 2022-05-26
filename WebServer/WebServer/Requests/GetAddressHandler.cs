using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/profile")]
    public class GetAddressHandler : RequestHandler
    {
        [Get("get")]
        public void GetAddress()
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
            Send(new AnswerModel(true, new { addresses = addresses }, null, null));

            //List<ClientAddresses> addresses2 = ClientAddresses.GetClientAddresses();
            //Send(new AnswerModel(true, new { addresses = addresses2 }, null, null));
        }
    }
}
