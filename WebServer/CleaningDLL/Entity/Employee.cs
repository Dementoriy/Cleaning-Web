using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Npgsql;

namespace CleaningDLL.Entity
{
    public class Employee : Human
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
        private static NpgsqlConnection npgsql = Context.npgsql;

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

        public static Employee GetEmployeeById(int id)
        {
            try
            {
                return db.Employee.FirstOrDefault(a => a.ID == id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static Employee GetBrigadirByBrigada(int id)
        {

            try
            {
                return db.Employee.FirstOrDefault(a => a.BrigadeID == id && a.Position.ID == 2);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static Employee GetEmployee(string Login, string Password)
        {

            try
            {
                return db.Employee.FirstOrDefault(a => a.Login == Login && a.Password == Password);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static Employee GetEmployeeBrigade(int Brigade)
        {

            try
            {
                return db.Employee.FirstOrDefault(a => a.BrigadeID == Brigade);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        //public static IEnumerable<EmployeeFullInfo> GetEmployeeFullInfo()
        //{
        //    return (from e in db.Employee
        //            join p in db.Position on e.PositionID equals p.ID
        //            select new EmployeeFullInfo()

        //            {
        //                ID = e.ID,
        //                Cleaner = e.AddFIO(),
        //                Positions = p.NamePosition,
        //                WorkExperience = e.EmploymentDate.ToString("d"),
        //                Brigade = e.Brigade.ID,
        //                Telefone = e.PhoneNumber,
        //            });
        //}

        public static IEnumerable<EmployeeFullInfo> GetEmployeeFullInfo()
        {
            var command = new NpgsqlCommand("SELECT e.\"ID\", e.\"Surname\", e.\"Name\", e.\"MiddleName\", p.\"NamePosition\", e.\"EmploymentDate\"," +
                                                    "e.\"BrigadeID\", e.\"PhoneNumber\" FROM \"Employee\" AS e " +
                                                    "JOIN \"Position\" AS p ON(e.\"PositionID\" = p.\"ID\")", npgsql);

            EmployeeFullInfo employeeFullInfo = new EmployeeFullInfo();

            using (var reader = command.ExecuteReader())
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        string fio = $"{"Surname"} {"Name".Substring(0, 1)}.";
                        if ("MiddleName" != "") fio += $"{"MiddleName".Substring(0, 1)}.";

                        employeeFullInfo.ID = reader.GetInt32(reader.GetOrdinal("ID"));
                        employeeFullInfo.Cleaner = reader.GetString(reader.GetOrdinal(fio));
                        employeeFullInfo.Positions = reader.GetString(reader.GetOrdinal("NamePosition"));
                        employeeFullInfo.WorkExperience = reader.GetString(reader.GetOrdinal("EmploymentDate"));
                        employeeFullInfo.Brigade = reader.GetInt32(reader.GetOrdinal("BrigadeID"));
                        employeeFullInfo.Telefone = reader.GetString(reader.GetOrdinal("PhoneNumber"));
                    }
                }
            }
            return (IEnumerable<EmployeeFullInfo>) employeeFullInfo;
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
