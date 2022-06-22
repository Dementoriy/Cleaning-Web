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

            List<ServiceModel> serviceModels = new List<ServiceModel>();
            foreach (var service in services)
            {
                ServiceModel serviceModel = new ServiceModel(service.ID, service.ServiceName, service.Description, service.Price, 
                    service.Time, service.Units.Unit, service.Image, service.IsMain, service.ApproximateTime);
                serviceModels.Add(serviceModel);
            }

            Send(new AnswerModel(true, new { services = serviceModels }, null, null));
        }

        [Post("get-time")]
        public void GetTime()
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

            var body = Bind<TimeModel>();

            if (body.timeValue == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            string stringTime = Order.GetTimeByInt(body.timeValue);

            Send(new AnswerModel(true, new { stringTime = stringTime }, null, null));

        }
    }
}
