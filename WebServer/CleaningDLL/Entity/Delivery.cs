using System;
using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class Delivery //Поставка
    {
        public int ID { get; set; }
        [Required]
        public Provider Provider { get; set; }
        [Required]
        public DateTime DeliveryDate { get; set; }
        [Required]
        public decimal DeliveryCost { get; set; }
        [Required]
        public DeliveryContent DeliveryContent { get; set; }

        public Delivery()
        {

        }
        public Delivery(Provider Provider, DateTime DeliveryDate, decimal DeliveryCost, DeliveryContent DeliveryContent)
        {
            this.Provider = Provider;
            this.DeliveryDate = DeliveryDate;
            this.DeliveryCost = DeliveryCost;
            this.DeliveryContent = DeliveryContent;
        }
    }
}
