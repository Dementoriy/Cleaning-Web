using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using WebServer.Models;
using CleaningDLL.Entity;
using Trivial.Security;

namespace WebServer.Requests;

[RequestHandlerPath("/cleaning")]
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
            Send(new AnswerModel(false, null, 1, "Алярма ошибка!"));
            return;
        }
        var client = new Client(body!.surname, body.name, body.middlename, body.phoneNumber, false, body.login, body.password, body.email);
        if (!client.AddClient())
        {
            Send(new AnswerModel(false, null, 1, "Алярма ошибка!"));
            return;
        }
        Send(new AnswerModel(true, new {token = GenerateToken(client) }, null, null));
    }
}