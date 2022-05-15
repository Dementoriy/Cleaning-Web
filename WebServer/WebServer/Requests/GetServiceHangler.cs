using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/service")]
    public class GetServiceHandler : RequestHandler
    {
        [Get("get")]
        public void GetService()
        {
            List<Service> services = Service.GetService();

            if (!services.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }

            Send(new AnswerModel(true, new { services = services }, null, null));
        }
    }
}
