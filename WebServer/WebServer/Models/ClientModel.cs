namespace WebServer.Models;

public class ClientModel
{
    public int id { get; set; }
    public string surname { get; set; }
    public string name { get; set; }
    public string? middleName { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string login { get; set; }
    public bool isOld { get; set; }
    public string? avatar { get; set; }

    public ClientModel(int id, string surname, string name, string? middleName, string email, string phone,
        string login, bool isOld, string? avatar)
    {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.middleName = middleName;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.isOld = isOld;
        this.avatar = avatar;
    }
}