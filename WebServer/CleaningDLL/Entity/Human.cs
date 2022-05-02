
namespace CleaningDLL.Entity
{
    public class Human
    {
        public string Surname { get; set; }
        public string Name { get; set; }
        public string? MiddleName { get; set; }
        public string PhoneNumber { get; set; }

        public Human()
        {
        }

        public Human(string Surname, string Name, string PhoneNumber)
        {
            this.Surname = Surname;
            this.Name = Name;
            this.PhoneNumber = PhoneNumber;
        }

        public Human(string Surname, string Name, string MiddleName, string PhoneNumber)
        {
            this.Surname = Surname;
            this.Name = Name;
            this.MiddleName = MiddleName;
            this.PhoneNumber = PhoneNumber;
        }
        public virtual string AddFIO()
        {
            string str = $"{Surname} {Name.Substring(0, 1)}.";
            if (MiddleName != "") str += $"{MiddleName.Substring(0, 1)}.";
            return str;
        }
        public virtual string GetFullName()
        {
            string str = $"{Surname} {Name}";
            if (MiddleName != "") str += $" {MiddleName}";
            return str;
        }
    }
}
