using WebServer.Models;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using Dadata;

namespace WebServer.Requests;

[RequestHandlerPath("/address")]
public class AddressHandler : RequestHandler
{
    [Get("get-address")]
    public void GetFilters()
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

        IEnumerable<Address> addresses = ClientAddresses.GetClientAddressesById(client.ID);

        List<AddressModel> addressModels = new List<AddressModel>();


        foreach(var address in addresses)
        {
            AddressModel addressModel = new AddressModel(address.ID, address.RoomType.Type, address.RoomType.Сoefficient, 
                address.AddressName, address.FullAddress, address.CurrentAddress);
            addressModels.Add(addressModel);
        }

        Send(new AnswerModel(true, new { addresses = addressModels }, null, null));

    }

    [Post("add-address")]
    public void addAddress()
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

        var body = Bind<AddressModel>();

        if (body.FullAddress == null || body.RoomType == null || body.FullAddress == "" || body.RoomType == "")
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        string enteredAddress = "Кировская область, Киров, ";
        enteredAddress += body.FullAddress;

        var daDatatoken = "24446a45461d9e48f334ed4d55e7ebdd8e66f39f";
        var api = new SuggestClient(daDatatoken);
        var result = api.SuggestAddress(enteredAddress);

        enteredAddress = enteredAddress.Substring(26);

        if (result.suggestions.Count == 0)
        {
            Send(new AnswerModel(false, null, 401, "incorrect address"));
            return;
        }

        List<string?> addressList = new List<string?>() {result.suggestions[0].data.city_district,
                result.suggestions[0].data.settlement, result.suggestions[0].data.street,
                result.suggestions[0].data.house, result.suggestions[0].data.block,
                result.suggestions[0].data.flat};

        CleaningDLL.Entity.Address address;

        RoomType roomType = RoomType.GetRoomTypeByName(body.RoomType);

        if (CleaningDLL.Entity.Address.CheckAddress(addressList[0], addressList[1],
                addressList[2], addressList[3], addressList[4], addressList[5], roomType.Type))
        {
            address = new CleaningDLL.Entity.Address(addressList[0], addressList[1], addressList[2],
                addressList[3], addressList[4], addressList[5], roomType, roomType.Type, enteredAddress, true);
            CleaningDLL.Entity.Address.Add(address);
        }
        else address = CleaningDLL.Entity.Address.GetAddress(addressList[0], addressList[1], addressList[2],
                addressList[3], addressList[4], addressList[5], roomType);

        ClientAddresses clientAddresses;
        if (ClientAddresses.CheckClientAddresses(address, client))
        {
            clientAddresses = new ClientAddresses(address, client);
            ClientAddresses.Add(clientAddresses);
        }
        else clientAddresses = ClientAddresses.GetClientAddresses(address, client);

        IEnumerable<Address> addresses = ClientAddresses.GetClientAddressesById(client.ID);

        List<AddressModel> addressModels = new List<AddressModel>();


        foreach (var a in addresses)
        {
            AddressModel am = new AddressModel(a.ID, a.RoomType.Type, a.RoomType.Сoefficient,
                a.AddressName, a.FullAddress, a.CurrentAddress);
            addressModels.Add(am);
        }

        Send(new AnswerModel(true, new { addresses = addressModels }, null, null));
    }

    [Post("del-address")]
    public void delClientAddress()
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

        var body = Bind<AddressModel>();

        if (body.ID == null)
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        Address address = Address.GetAddressById(body.ID);

        address.CurrentAddress = body.CurrentAddress;
        address.Update();

        IEnumerable<Address> addresses = ClientAddresses.GetClientAddressesById(client.ID);

        List<AddressModel> addressModels = new List<AddressModel>();


        foreach (var a in addresses)
        {
            AddressModel am = new AddressModel(a.ID, a.RoomType.Type, a.RoomType.Сoefficient,
                a.AddressName, a.FullAddress, a.CurrentAddress);
            addressModels.Add(am);
        }

        Send(new AnswerModel(true, new { addresses = addressModels }, null, null));

    }

    [Post("change-address")]
    public void changeAddress()
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

        var body = Bind<AddressModel>();

        if (body.FullAddress == null || body.RoomType == null || body.FullAddress == "" || body.RoomType == "" || body.AddressName == "" || body.AddressName == null)
        {
            Send(new AnswerModel(false, null, 400, "incorrect request"));
            return;
        }

        Address address = Address.GetAddressById(body.ID);

        address.FullAddress = body.FullAddress;
        address.RoomType = RoomType.GetRoomTypeByName(body.RoomType);
        address.AddressName = body.AddressName;
        address.Update();

        IEnumerable<Address> addresses = ClientAddresses.GetClientAddressesById(client.ID);

        List<AddressModel> addressModels = new List<AddressModel>();


        foreach (var a in addresses)
        {
            AddressModel am = new AddressModel(a.ID, a.RoomType.Type, a.RoomType.Сoefficient,
                a.AddressName, a.FullAddress, a.CurrentAddress);
            addressModels.Add(am);
        }

        Send(new AnswerModel(true, new { addresses = addressModels }, null, null));
    }

}