using System;
using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class DeliveryContract
    {
        public int ID { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Provider Provider { get; set; }
        [Required]
        public PurchaseRequisition PurchaseRequisition { get; set; }
        [Required]
        public DateTime DeliveryContractDate { get; set; }

        public DeliveryContract()
        {

        }
        public DeliveryContract(Employee Employee, Provider Provider, PurchaseRequisition PurchaseRequisition, DateTime DeliveryContractDate)
        {
            this.Employee = Employee;
            this.Provider = Provider;
            this.PurchaseRequisition = PurchaseRequisition;
            this.DeliveryContractDate = DeliveryContractDate;
        }
    }
}
