using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;
using System.Net.Mail;
using System.Net;
using System.Text;
using NPOI.Util.Collections;
using NPOI.XSSF.UserModel;
using System.IO;
using Microsoft.Win32;
using System.Windows;
using Microsoft.Office;


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

                    var providedService = new ProvidedService(order, Service.GetServiceById(body.service.ID), body.square);
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

                var providedService = new ProvidedService(order, Service.GetServiceById(body.service.ID), body.square);
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
            s.Append("<h2>" + "Услуга: " + body.service.ServiceName + ". Площадь: " + body.square + " м" + "<sup>" + 2 + "</sup>" + ". Цена: " + body.square * body.service.Price * body.address.Сoefficient + " руб." +"</h2>" + Environment.NewLine);

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
            s.Append("<h2 style = \"text-align:right; \">" + "Количество заявок: " + body.count + "</h2 >");
            if (body.dateTimeEnd != null)
                s.Append("<h2 style = \"text-align:right; \">" + "Статус заявок: Оплачены" + "</h2 >");
            else s.Append("<h2 style = \"text-align:right; \">" + "Статус заявки: Оплачена" + "</h2 >");
            s.Append("<h2 style = \"text-align:right; \">" + "Цена: " + body.price + " руб." + "</h2 >" + Environment.NewLine);
            s.Append("<h2 style = \"text-align:right; \">" + "Итоговая цена: " + body.price * body.count + " руб." + "</h2 >" + Environment.NewLine);
            return s.ToString();
        }

        [Post("add-report")]
        public void addReport()
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

            var body = Bind<FiltersStateModal>();

            if (body.address == null || body.dateOt == null || body.dateDo == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            List<Address> addresses = new List<Address>();

            //foreach(var address in body.address)
            //{
            Address am = Address.GetAddressById(body.address);
            addresses.Add(am);
            //}

            DateTime dateTimeOt = DateTime.Parse(body.dateOt);
            DateTime dateTimeDo = DateTime.Parse(body.dateDo);
            dateTimeDo = dateTimeDo.AddDays(1);

            List<Order> filteredOrders = Order.GetFilteredOrders(client.ID, addresses, dateTimeOt, dateTimeDo);

            List<OrderModel> orderModels = OrderModel.GetOrderModels(filteredOrders);

            if (body.consumables == null || body.consumables == 0)
            {
                Send(new AnswerModel(true, new { objects = orderModels }, null, null));

                var fileExcell = FillExcell(body, orderModels);

                var from = new MailAddress("dim01-02@mail.ru", "Клининговая компания Чистый дом");
                var to = new MailAddress(client.Email, "Пользователь");

                var msg = new MailMessage(from, to);
                msg.Subject = "Отчет о завершенных уборках";
                msg.Attachments.Add(new Attachment(fileExcell));
                msg.Body = "Отчет о завершенных уборках в период с " + dateTimeOt + " по " + dateTimeDo + ".";
                using (var smtp = new SmtpClient("smtp.mail.ru", 587))
                {
                    smtp.Credentials = new NetworkCredential("dim01-02@mail.ru", "4maYhT90pS5KgM67M1wN");
                    smtp.EnableSsl = true;
                    smtp.Send(msg);
                }

                return;
            }
            else
            {
                List<Consumable> consumables = new List<Consumable>();

                //foreach (var consumable in body.consumables)
                //{
                Consumable c = Consumable.GetConsumableById(body.consumables);
                consumables.Add(c);
                //}

                List<ConsumableModel> consumableModels = new List<ConsumableModel>();

                foreach (var model in consumables)
                {
                    ConsumableModel cm = new ConsumableModel(model.ID, model.ConsumableName, model.Description);
                    consumableModels.Add(cm);
                }

                List<OrderModel> filteredOrderModels = OrderModel.GetFilteredOrderModels(consumableModels, orderModels);

                Send(new AnswerModel(true, new { objects = filteredOrderModels }, null, null));

                var fileExcell = FillExcell(body, filteredOrderModels);

                var from = new MailAddress("dim01-02@mail.ru", "Клининговая компания Чистый дом");
                var to = new MailAddress(client.Email, "Пользователь");

                var msg = new MailMessage(from, to);
                msg.Subject = "Отчет о завершенных уборках";
                msg.Attachments.Add(new Attachment(fileExcell));
                msg.Body = "Отчет о завершенных уборках в период с " + dateTimeOt + " по " + dateTimeDo + ".";
                using (var smtp = new SmtpClient("smtp.mail.ru", 587))
                {
                    smtp.Credentials = new NetworkCredential("dim01-02@mail.ru", "4maYhT90pS5KgM67M1wN");
                    smtp.EnableSsl = true;
                    smtp.Send(msg);
                }
            }

        }
        public static string FillExcell(FiltersStateModal body, List<OrderModel> orderModels)
        {
            string path = Directory.GetCurrentDirectory();
            string filePath = Path.Combine(path, $"Report " + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx");

            var file = File.Create(filePath);
                var template = new MemoryStream(Properties.Resources.Report, true);
                var workbook = new XSSFWorkbook(template);
                var sheet = workbook.GetSheetAt(0);

                sheet.GetRow(6).CreateCell(7);
                sheet.GetRow(7).CreateCell(2);
                sheet.GetRow(7).CreateCell(7);
                sheet.GetRow(8).CreateCell(2);
                sheet.GetRow(8).CreateCell(7);
                sheet.GetRow(6).CreateCell(6);
                sheet.GetRow(7).CreateCell(6);

                sheet.GetRow(7).GetCell(2).SetCellValue(body.dateOt);
                sheet.GetRow(8).GetCell(2).SetCellValue(body.dateDo);
                sheet.GetRow(6).GetCell(6).SetCellValue(orderModels.Count());
                sheet.GetRow(7).GetCell(6).SetCellValue(body.consumables);

                sheet.ShiftRows(11, 11 + int.Parse(orderModels.Count().ToString()), int.Parse(orderModels.Count().ToString()), true, true);
                int row = 11;

                foreach (var item in orderModels)
                {
                    var rowInsert = sheet.CreateRow(row);
                    rowInsert.CreateCell(0).SetCellValue(row - 10);
                    rowInsert.GetCell(0).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(1).SetCellValue(item.ID);
                    rowInsert.GetCell(1).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(2).SetCellValue(item.Date);
                    rowInsert.GetCell(2).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(3).SetCellValue(item.Address.FullAddress);
                    rowInsert.GetCell(3).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(4).SetCellValue(item.Status);
                    rowInsert.GetCell(4).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(5).SetCellValue(item.FinalPrice);
                    rowInsert.GetCell(5).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    rowInsert.CreateCell(6).SetCellValue(item.ApproximateTime);
                    rowInsert.GetCell(6).CellStyle = sheet.GetRow(10).GetCell(0).CellStyle;
                    row++;
                }


                workbook.Write(file);
                workbook.Close();
                template.Close();
                file.Close();

                return (filePath);
        }
    }
}
