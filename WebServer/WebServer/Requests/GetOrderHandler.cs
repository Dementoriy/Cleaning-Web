using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace WebServer.Requests
{
    [RequestHandlerPath("/my-cleaning")]
    public class GetOrderHandler : RequestHandler
    {
        [Get("get")]
        public void GetOrder()
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
            List<Order> orders = Order.GetClientOrder(client.ID);
            
            Send(new AnswerModel(true, new { objects = OrderModel.GetOrderModels(orders) }, null, null));
        }

        [Get("get-by-id")]
        public void GetOrderById()
        {
            if(Params.TryGetValue("id", out var id))
            {
                var order = Order.GetOrderById(Int32.Parse(id));
                
                List<Order> orders = new List<Order>();
                orders.Add(order);
                Send(new AnswerModel(true, new { order = OrderModel.GetOrderModels(orders).First() }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }

        [Post("add-rating")]
        public void addRating()
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

            var body = Bind<OrderModel>();

            if (body.ID == null || body.Rating == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            Order order = Order.GetOrderById(body.ID);

            if (body.Rating != order.Rating)
            {
                order.Rating = body.Rating;
                order.Update();
            }

            List<Order> orders = new List<Order>();
            orders.Add(order);

            Send(new AnswerModel(true, new { order = OrderModel.GetOrderModels(orders).First() }, null, null));
        }

        [Post("cancell-Order")]
        public void cancellOrder()
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

            var body = Bind<OrderModel>();

            if (body.ID == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            Order order = Order.GetOrderById(body.ID);

            order.Status = "Отменена";
            order.Update();

            List<Order> orders = Order.GetClientOrder(client.ID);

            Send(new AnswerModel(true, new { objects = OrderModel.GetOrderModels(orders) }, null, null));
        }

        [Post("add-order")]
        public void addOrder()
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
            
            var body = Bind<FinalOrderInfoModel>();

            if (body.address == null || body.dateTime == null || body.service == null || body.square == null 
                || body.time == null || body.price == null || body.timeValue == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            Address address = Address.GetAddressById(body.address.ID);
            Employee employee = Employee.GetEmployeeById(1);
            Brigade brigade = Brigade.GetBrigadeByID(1);
            DateTime dateTime = DateTime.Parse(body.dateTime);

            if(body.dateTimeEnd != null &&  body.periodicity != 0)
            {
                DateTime dateTimeEnd = DateTime.Parse(body.dateTimeEnd);
                dateTimeEnd = dateTimeEnd.AddDays(1);
                for (DateTime dateStart = dateTime; dateStart <= dateTimeEnd; dateStart = dateStart.AddDays(body.periodicity))
                {
                    Order order = new Order("Назначен выезд", client, employee, address,
                        brigade, dateStart, body.price, body.timeValue,
                        body.comment, null);

                    Order.Add(order);

                    var providedService = new ProvidedService(order, Service.GetServiceById(body.service.ID), Int32.Parse(body.square));
                    ProvidedService.Add(providedService);

                    if (body.dopService != null)
                    {
                        for (int i = 0; i < body.amount.Length; i++)
                        {
                            providedService = new ProvidedService(order, Service.GetServiceById(body.dopService[i].ID), Int32.Parse(body.amount[i]));
                            ProvidedService.Add(providedService);
                        }
                    }

                    Order.Update(order);
                }
            }
            else
            {
                Order order = new Order("Назначен выезд", client, employee, address,
                        brigade, dateTime, body.price, body.timeValue,
                        body.comment, null);

                Order.Add(order);

                var providedService = new ProvidedService(order, Service.GetServiceById(body.service.ID), Int32.Parse(body.square));
                ProvidedService.Add(providedService);

                if (body.dopService != null)
                {
                    for (int i = 0; i < body.amount.Length; i++)
                    {
                        providedService = new ProvidedService(order, Service.GetServiceById(body.dopService[i].ID), Int32.Parse(body.amount[i]));
                        ProvidedService.Add(providedService);
                    }
                }

                Order.Update(order);
            }
            

            List<Order> orders = Order.GetClientOrder(client.ID);

            Send(new AnswerModel(true, new { objects = OrderModel.GetOrderModels(orders) }, null, null));

            
            var from = new MailAddress("dim01-02@mail.ru", "Клининговая компания Чистый дом");
            var to = new MailAddress(client.Email, "Пользователь");

            var msg2 = new MailMessage(from, to);
            msg2.Subject = "Товарный чек";
            msg2.Body = FillTable(body);
            msg2.IsBodyHtml = true;
            using (var smtp = new SmtpClient("smtp.mail.ru", 587))
            {
                smtp.Credentials = new NetworkCredential("dim01-02@mail.ru", "4maYhT90pS5KgM67M1wN");
                smtp.EnableSsl = true;
                smtp.Send(msg2);
            }
            
        }
        public static string FillTable(FinalOrderInfoModel body)
        {
            var s = new StringBuilder("<h1 style = \"text-align:center;\">" + "Товарный чек" + "</h1>" + Environment.NewLine);
            s.Append("<div style = \"border:3px solid black;width:50%;margin:auto\">" + Environment.NewLine);
            s.Append("<h2 style = \"text-align:center; \">" + "Место оказания услуг" + "</h2 >" + Environment.NewLine);
            s.Append("<h2>" + "Адрес: " + body.address.FullAddress +"</h2> " + Environment.NewLine);
            s.Append("<h2>" + "Тип помещения: " + body.address.RoomType + "</h2>" + Environment.NewLine);
            if(body.dateTimeEnd != null)
            {
                s.Append("<h2 style = \"text-align:center; \">" + "Период оказания услуг " + "</h2 >" + Environment.NewLine);
                s.Append("<h2>" + "С " + DateTime.Parse(body.dateTime) + "</h2 >" + Environment.NewLine);
                s.Append("<h2>" + "До " + DateTime.Parse(body.dateTime) + "</h2 >" + Environment.NewLine);
                s.Append("<h2>" + "С периодом в " + body.periodicity + " дня" + "</h2 >" + Environment.NewLine);
            }
            else
            {
                s.Append("<h2 style = \"text-align:center; \">" + "Дата оказания услуг " + "</h2 >" + Environment.NewLine);
                s.Append("<h2>" + DateTime.Parse(body.dateTime) + "</h2 >");
            }
            s.Append("<h2>" + "Услуга: " + body.service.ServiceName + ". Площадь: " + body.square + " м" + "<sup>" + 2 + "</sup>" + ". Цена: " + Int32.Parse(body.square) * body.service.Price * body.address.Сoefficient + " руб." +"</h2>" + Environment.NewLine);

            if (body.dopService != null)
            {
                s.Append("<h2 style = \"text-align:center; \">" + "Дополнительные услуги" + "</h2 >" + Environment.NewLine);
                for (int i = 0; i < body.amount.Length; i++)
                {
                    s.Append("<h2>" + "Услуга: " + body.dopService[i].ServiceName + ". Количество: " + body.amount[i] + ". Цена: " + Int32.Parse(body.amount[i]) * body.dopService[i].Price * body.address.Сoefficient + " руб." + "</h2>" + Environment.NewLine);
                }
            }
            if(body.comment != null)
                s.Append("<h2>" + "Комментирий: " + body.comment + "</h2 >" + Environment.NewLine);

            s.Append("<h2 style = \"text-align:center; \">" + "Итог" + "</h2 >" + Environment.NewLine);
            s.Append("<h2>" + "Количество заявок: " + body.count + "</h2 >");
            if (body.dateTimeEnd != null)
                s.Append("<h2>" + "Статус заявок: Оплачены" + "</h2 >");
            else s.Append("<h2>" + "Статус заявки: Оплачена" + "</h2 >");
            s.Append("<h2>" + "Цена: " + body.price + " руб." + "</h2 >" + Environment.NewLine);
            s.Append("<h2>" + "Итоговая цена: " + body.price * body.count + " руб." + "</h2 >" + Environment.NewLine);
            return s.ToString();
        }
    }
}
