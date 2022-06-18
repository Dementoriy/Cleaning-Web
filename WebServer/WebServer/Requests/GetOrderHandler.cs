﻿using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using CleaningDLL.Entity;
using WebServer.Models;

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

            Order order = new Order("Назначен выезд", client, employee, address,
                        brigade, dateTime, body.price, body.timeValue,
                        body.comment, null);

            Order.Add(order);

            var providedService = new ProvidedService(order, Service.GetServiceById(body.service.ID), body.square);
            ProvidedService.Add(providedService);

            for ( int i = 0; i < body.amount.Length; i++)
            {
                providedService = new ProvidedService(order, Service.GetServiceById(body.dopService[i].ID), body.amount[i]);
                ProvidedService.Add(providedService);
            }

            Order.Update(order);

            List<Order> orders = Order.GetClientOrder(client.ID);

            Send(new AnswerModel(true, new { objects = OrderModel.GetOrderModels(orders) }, null, null));
        }
    }
}
