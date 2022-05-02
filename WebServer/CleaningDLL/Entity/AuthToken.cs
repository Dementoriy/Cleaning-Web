using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity;
public class AuthToken
{
    [Key]
    public string Token { get; set; }
    public DateTime TokenTime  { get; set; }
    private static ApplicationContext db = Context.Db;

    internal AuthToken()
    {
        Token = "";
        TokenTime = DateTime.MinValue;
    }
    private AuthToken(string token)
    {
        Token = token;
        TokenTime = DateTime.Now;
    }
    public static bool AddToken(string token)
    {
        var jwtToken = new AuthToken(token);
        try
        {
            db.AuthTokens.Add(jwtToken);
            db.AddRange();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public static bool RemoveToken(TimeSpan timeSpan)
    {
        try
        {
            db.AuthTokens.RemoveRange(db.AuthTokens.Where(a => (DateTime.Now - timeSpan) > a.TokenTime));
            db.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public static bool ContainsToken(string token)
    {
        return db.AuthTokens.FirstOrDefault(a => a.Token == token) is not null;
    }
}
