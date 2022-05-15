using System.ComponentModel.DataAnnotations;

namespace CleaningDLL.Entity
{
    public class Provider
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)] public string CompanyName { get; set; }
        [Required]
        [MaxLength(12)] public string ProviderTelefonNumber { get; set; }
        [Required]
        public Address Address { get; set; }

        public Provider()
        {

        }
        public Provider(string CompanyName, string ProviderTelefonNumber, Address Address)
        {
            this.CompanyName = CompanyName;
            this.ProviderTelefonNumber = ProviderTelefonNumber;
            this.Address = Address;
        }
    }
}
