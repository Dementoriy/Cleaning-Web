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
            //IssuedAt = DateTime.Now,
            Expiration = DateTime.Now + new TimeSpan(31, 0, 0),
        };
        var jwt = new JsonWebToken<JsonWebTokenPayload>(model, Program.Sign);
        var jwtStr = jwt.ToEncodedString();
        //AuthToken.RemoveToken(new TimeSpan(1, 0, 0, 0));
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
        if(!Client.proverkaClientTelefon(body.phone))
        {
            var newClient = new Client(body!.surname, body.name, body.middlename, body.phone, false, body.login, body.password, body.email, null);
            if (!newClient.AddClient())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }

            var tokens = GenerateToken(newClient);
            Send(new AnswerModel(true, new
            {
                access_token = tokens,
                user = new ClientModel(newClient.ID,
                    newClient.Surname, newClient.Name, newClient.MiddleName, newClient.Email!,
                    newClient.PhoneNumber,
                    newClient.Login, newClient.IsOldClient, newClient.Avatar)
            }, null, null));
        }
        else
        {
            Client updateClient = Client.GetClientByTelefon(body.phone);
            if(updateClient.Password == null && !Client.proverkaClientLogin(body.login))
            {
                updateClient.Email = body.email;
                updateClient.Login = body.login;
                updateClient.Password = body.password;
                updateClient.Login = body.login;
                updateClient.Update();

                var tokens = GenerateToken(updateClient);
                Send(new AnswerModel(true, new
                {
                    access_token = tokens,
                    user = new ClientModel(updateClient.ID,
                        updateClient.Surname, updateClient.Name, updateClient.MiddleName, updateClient.Email!,
                        updateClient.PhoneNumber,
                        updateClient.Login, updateClient.IsOldClient, updateClient.Avatar)
                }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }
        }
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