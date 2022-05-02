using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CleaningDLL.Entity
{
    public class Employee : Human //Сотрудник
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(10)] public string PassportData { get; set; }
        [Required]
        public Position Position { get; set; }
        [Required]
        public int PositionID { get; set; }
        public Brigade? Brigade { get; set; }
        public int? BrigadeID { get; set; }
        [Required]
        public DateTime EmploymentDate { get; set; }
        [MaxLength(50)] public string? Login { get; set; }
        [MaxLength(64)] [MinLength(64)] public string? Password { get; set; }

        private static ApplicationContext db = Context.Db;


        public Employee()
        {

        }
        public Employee(string Surname, string Name, string MiddleName, string PassportData, string PhoneNumber, int PositionID, int? BrigadeID,
            DateTime EmploymentDate, string? Login, string? Password) : base(Surname, Name, MiddleName, PhoneNumber)
        {
            this.PassportData = PassportData;
            this.PositionID = PositionID;
            this.BrigadeID = BrigadeID;
            this.EmploymentDate = EmploymentDate;
            this.Login = Login;
            this.Password = Password;
        }
        public override string GetFullName()
        {
            if(BrigadeID != null )
            {
                return "Исполнитель: " + base.GetFullName();

            }
            return "Заявку принял: " + base.GetFullName();

        }
        public class EmployeeInfo
        {
            public int Surname { get; set; }
            public string Name { get; set; }
            public string MiddleName { get; set; }
        }


        public static Employee GetBrigadirByBrigada(int id)
        {
            return db.Employee.Where(a => a.BrigadeID == id && a.Position.ID == 2).FirstOrDefault();
        }
        public static Employee GetEmployee(string Login, string Password)
        {
            return db.Employee.Where(a => a.Login == Login && a.Password == Password).FirstOrDefault();
        }
        public static Employee GetEmployeeBrigade(int Brigade)
        {
            return db.Employee.Where(a => a.BrigadeID == Brigade).FirstOrDefault();
        }

        
        public static List<EmployeeFullInfo> GetEmployeeFullInfo()
        {
            return (from e in db.Employee
                    join p in db.Position on e.PositionID equals p.ID
                    select new EmployeeFullInfo()

                    {
                        ID = e.ID,
                        Cleaner = e.AddFIO(),
                        Positions = p.NamePosition,
                        WorkExperience = e.EmploymentDate.ToString("d"), 
                        Brigade = e.Brigade.ID,
                        Telefone = e.PhoneNumber,
                    }).ToList();
        }
        public class EmployeeFullInfo
        {
            public int ID { get; set; }
            public string Cleaner { get; set; }
            public string Positions { get; set; }
            public string WorkExperience { get; set; }
            public int? Brigade { get; set; }
            public string Telefone { get; set; }
        }
    }
}
