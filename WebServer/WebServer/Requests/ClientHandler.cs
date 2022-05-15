using WebServer.Models;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;

namespace WebServer.Requests;

[RequestHandlerPath("/client")]
public class ClientHandler : RequestHandler
{
    [Post("/avatar")]
    public void AddAvatar()
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

        var body = Bind<AvatarModel>();
        if (body is null || string.IsNullOrEmpty(body.avatar))
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        client.Avatar = body.avatar;
        if (!client.Update())
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        Send(new AnswerModel(true, new
        {
            user = new ClientModel(client.ID, client.Surname, client.Name, client.MiddleName, client.Email!,
                client.PhoneNumber, client.Login, client.IsOldClient, client.Avatar)
        }, null, null));
    }
}