using RestPanda;
using Trivial.Security;
using CleaningDLL;

namespace WebServer;


internal class Program
{
    internal static HashSignatureProvider Sign { get; private set; } = null!;
    private static void Main(string[] args)
    {
        new ApplicationContext(ApplicationContext.GetDb());
        Sign = HashSignatureProvider.CreateHS256("myString");
        var config = new PandaConfig();
        config.AddHeader("access-control-allow-origin", "*");
        config.AddHeader("access-control-allow-headers", "*");
        var server = new PandaServer(config, new Uri("http://localhost:8080/"));
        server.Start();
        Console.WriteLine("Server started");
        Console.Read();
        server.Stop();
    }
}