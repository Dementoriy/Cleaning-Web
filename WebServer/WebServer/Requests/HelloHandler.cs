using RestPanda.Requests;
using RestPanda.Requests.Attributes;

namespace WebServer.Requests;

[RequestHandlerPath]
public class HelloHandler : RequestHandler
{
    [Get]
    public void HelloSay()
    {
        Send(new{Hello="World!"});
    }
}