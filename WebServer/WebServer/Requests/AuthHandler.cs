using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using WebServer.Models;
using CleaningDLL.Entity;
using Trivial.Security;

namespace WebServer.Requests;

[RequestHandlerPath("/auth")]
public class AuthHandler : RequestHandler
{
    private string GenerateToken(Client client)
    {
        var model = new JsonWebTokenPayload { Id = Guid.NewGuid().ToString("n"), Issuer = $"{client.Login}", Expiration = DateTime.Now + new TimeSpan(1, 0, 0) };
        var refreshModel = new JsonWebTokenPayload
        {
            Id = Guid.NewGuid().ToString("n"),
            Issuer = $"{client.Login}",
            IssuedAt = DateTime.Now
        };
        var jwt = new JsonWebToken<JsonWebTokenPayload>(model, Program.Sign);
        var jwtStr = jwt.ToEncodedString();
        AuthToken.RemoveToken(new TimeSpan(1, 0, 0, 0));
        return AuthToken.AddToken(jwtStr) ? jwtStr : "";
    }

    [Post("/registration")]
    public void Regisration()
    {
        var body = Bind<RegModel>();
        if(RegModel.Check(body))
        {
            Send(new AnswerModel(false, null, 401, "incorrect request"));
            return;
        }
        var client = new Client(body!.surname, body.name, body.middlename, body.phone, false, body.login, body.password, body.email, null);
        if (!client.AddClient())
        {
            Send(new AnswerModel(false, null, 401, "incorrect request"));
            return;
        }

        var tokens = GenerateToken(client);
        Send(new AnswerModel(true, new
        {
            access_token = tokens,
            user = new ClientModel(client.ID,
                client.Surname, client.Name, client.MiddleName, client.Email!,
                client.PhoneNumber,
                client.Login, client.IsOldClient, client.Avatar)
        }, null, null));
    }
    [Post("/authorization")]
    public void Authorization()
    {
        var body = Bind<AuthModel>();
        if (body is null || string.IsNullOrEmpty(body.login) || string.IsNullOrEmpty(body.password))
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        var client = Client.GetClient(body.login, body.password);
        if (client is null)
        {
            Send(new AnswerModel(false, null, 401, "incorrect request body"));
            return;
        }

        var tokens = GenerateToken(client);
        Send(new AnswerModel(true, new
        {
            access_token = tokens,
            user = new ClientModel(client.ID,
                client.Surname, client.Name, client.MiddleName, client.Email!, client.PhoneNumber,
                client.Login, client.IsOldClient, client.Avatar)
        }, null, null));
    }
}