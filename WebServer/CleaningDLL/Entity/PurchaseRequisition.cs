using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class PurchaseRequisition //Заявка на закупку
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string Status { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Provider Provider { get; set; }
        [Required]
        public RequisitionContent RequisitionContent { get; set; }
        public int RequisitionContentID { get; set; }

        public PurchaseRequisition()
        {

        }
        public PurchaseRequisition(string Status, Employee Employee, Provider Provider, RequisitionContent RequisitionContent)
        {
            this.Status = Status;
            this.Employee = Employee;
            this.Provider = Provider;
            this.RequisitionContent = RequisitionContent;
        }
    }
}
