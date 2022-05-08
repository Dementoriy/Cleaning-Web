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
        var model = new JsonWebTokenPayload { Id = Guid.NewGuid().ToString("n"), Issuer = $"{client.Login},{client.Surname}" };
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
            Send(new AnswerModel(false, null, 1, "Ошибка!"));
            return;
        }
        var client = new Client(body!.surname, body.name, body.middlename, body.phone, false, body.login, body.password, body.email);
        if (!client.AddClient())
        {
            Send(new AnswerModel(false, null, 1, "Ошибка!"));
            return;
        }
        Send(new AnswerModel(true, new {token = GenerateToken(client) }, null, null));
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

        var client = Profile.GetClientAuth(body.login, body.password);
        if (client is null)
        {
            Send(new AnswerModel(false, null, 401, "incorrect request body"));
            return;
        }

        var tokens = GenerateToken(client.Profile!);
        Send(new AnswerModel(true, new
        {
            access_token = tokens.Item1,
            user = new ClientModel(client.Id,
                client.Surname, client.Name, client.MiddleName, client.Email!, client.PhoneNumber,
                client.Profile!.Login, client.IsOld, client.Avatar)
        }, null, null));
    }
}