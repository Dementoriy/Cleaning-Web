using WebServer.Models;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;

namespace WebServer.Requests;

[RequestHandlerPath("/profile")]
public class ClientHandler : RequestHandler
{
    [Post("change-client-info")]
    public void ChangeClientInfo()
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
        var body = Bind<ClientModel>();
        if (body.surname == null || body.name == null || body.email == null || body.phone == null || body.login == null)
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        if(body.surname != client.Surname || body.name != client.Name || body.middleName != client.MiddleName 
            || body.email != client.Email || body.phone != client.PhoneNumber || body.login != client.Login || body.avatar != client.Avatar)
        {
            client.Avatar = body.avatar == "" ? null : body.avatar;
            client.Surname = body.surname;
            client.Name = body.name;
            client.MiddleName = body.middleName;
            client.Email = body.email;
            if(!Client.proverkaClientTelefon(body.phone))
                client.PhoneNumber = body.phone;
            if(!Client.proverkaClientLogin(body.login))
                client.Login = body.login;
            client.Update();
        }
        Send(new AnswerModel(true, new
        {
            user = new ClientModel(client.ID, client.Surname, client.Name, client.MiddleName, client.Email!,
                client.PhoneNumber, client.Login, client.IsOldClient, client.Avatar)
        }, null, null));
    }
}