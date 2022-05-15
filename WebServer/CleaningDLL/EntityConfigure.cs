using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CleaningDLL.Entity;
using System;

namespace CleaningDLL
{
    public static class EntityConfigure
    {
        public static void PositionConfigure(EntityTypeBuilder<Position> builder)
        {
            builder.HasData(new Position("Администратор", "Обрабатывать заявки") { ID = 1 });
            builder.HasData(new Position("Бригадир", "Главный клинер. Заведует бригадой") { ID = 2 });
            builder.HasData(new Position("Клинер", "Совершать уборку на объекте") { ID = 3 });
        }
        public static void BrigadeConfigure(EntityTypeBuilder<Brigade> builder)
        {
            builder.HasData(new Brigade("Смена1") { ID = 1 });
            builder.HasData(new Brigade("Смена2") { ID = 2 });
        }
        public static void EmployeeConfigure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasData(new Employee("Ведерников", "Дмитрий", "Михайлович", "1111222222", "+79536773183", 1, null, 
                DateTime.Parse("30/11/2021 10:30"), "admin", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3") 
            { ID = 1 }); //Pass 123
            builder.HasData(new Employee("Бессонов", "Иван", "Анатольевич", "1111333333", "+79536856008", 2, 1, 
                DateTime.Parse("30/11/2021 11:00"), "brigadir1", "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4") 
            { ID = 2 }); //Pass 1234
            builder.HasData(new Employee("Заболотский", "Александр", "Николаевич", "1111444444", "+79123646993", 2, 2, 
                DateTime.Parse("30/11/2021 11:00"), "brigadir2", "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5") 
            { ID = 3 }); //Pass 1235
            builder.HasData(new Employee("Москалев", "Дмитрий", "Игоревич", "1111555555", "+79536952565", 3, 1,
                DateTime.Parse("1/12/2021 11:30"), null, null) { ID = 4 });
            builder.HasData(new Employee("Суслов", "Роман", "Владимирович", "1111666666", "+79091324445", 3, 1,
                DateTime.Parse("1/12/2021 11:30"), null, null) { ID = 5 });
            builder.HasData(new Employee("Орлов", "Максим", "Игоревич", "1111777777", "+79123644673", 3, 2,
                DateTime.Parse("2/12/2021 10:00"), null, null) { ID = 6 });
            builder.HasData(new Employee("Целищев", "Дмитрий", "Константинович", "1111888888", "+79229357609", 3, 2,
                DateTime.Parse("2/12/2021 10:00"), null, null) { ID = 7 });
        }
        public static void InventoryTypeConfigure(EntityTypeBuilder<InventoryType> builder)
        {
            builder.HasData(new InventoryType("Пылесос") { ID = 1 });
            builder.HasData(new InventoryType("Стеклоочиститель") { ID = 2 });
            builder.HasData(new InventoryType("Вакуумный очиститель") { ID = 3 });
            builder.HasData(new InventoryType("Дезинфектор") { ID = 4 });
        }
        public static void ReferenceUnitsOfMeasurementConfigure(EntityTypeBuilder<ReferenceUnitsOfMeasurement> builder)
        {
            builder.HasData(new ReferenceUnitsOfMeasurement("м2", "Измеряется в метрах квадратных") { ID = 1 });
            builder.HasData(new ReferenceUnitsOfMeasurement("шт", "Измеряется в штуках") { ID = 2 });
            builder.HasData(new ReferenceUnitsOfMeasurement("упаковка", "Измеряется в упаковках") { ID = 3 });
            builder.HasData(new ReferenceUnitsOfMeasurement("л", "Измеряется в литрах") { ID = 4 });
            builder.HasData(new ReferenceUnitsOfMeasurement("кг", "Измеряется в килограммах") { ID = 5 });
            builder.HasData(new ReferenceUnitsOfMeasurement("г", "Измеряется в граммах") { ID = 6 });
        }
        public static void ServiceConfigure(EntityTypeBuilder<Service> builder)
        {
            builder.HasData(new Service("Экспресс уборка", "Поддерживающая уборка. Объект должен быть в незапущенном состоянии. Цена за 1м2.", 40, 1, 100, null) { ID = 1, UnitsID = 1 });
            builder.HasData(new Service("Генеральная уборка", "Генеральная уборка. Цена за 1м2.", 70, 1, 220, null) { ID = 2, UnitsID = 1 });
            builder.HasData(new Service("Послестроительная уборка", "Уборка на объекте после ремонта/стройки (Обильное загрязнение). Цена за 1м2.", 80, 1, 220, null) { ID = 3, UnitsID = 1 });
            builder.HasData(new Service("Комплексная уборка", "Комплексная уборка помещений нужна, чтобы более тщательно убрать квартиру, в которой периодически убираются. Цена за 1м2.", 50, 1, 100, null) { ID = 4, UnitsID = 1 });
            builder.HasData(new Service("Мойка окон", "Мойка окон. Цена за 1 створу.", 250, 2, 60, null) { ID = 5, UnitsID = 2 });
            builder.HasData(new Service("Мойка стеклянных дверей", "Мойка стеклянных дверей балконов и лоджий. Цена за 1 дверь.", 500, 2, 120, null) { ID = 6, UnitsID = 2 });
            builder.HasData(new Service("Химчистка диванов", "Химчистка диванов. Мягкой мебели. Цена за 1 место.", 300, 3, 3600, null) { ID = 7, UnitsID = 2 });
            builder.HasData(new Service("Химчистка кресел", "Химчистка кресел. Мягкой мебели. Цена за 1 кресло.", 300, 3, 3600, null) { ID = 8, UnitsID = 2 });
            builder.HasData(new Service("Химчистка ковров", "Химчистка ковров, матрасов. Цена за 1м2.", 150, 3, 300, null) { ID = 9, UnitsID = 1 });
            builder.HasData(new Service("Дезинфекция", "Дезинфекция помещений, твердых поверхносте, воздуха. Цена за 1м2.", 40, 4, 30, null) { ID = 10, UnitsID = 2 });
        }
        public static void RoomTypeConfigure(EntityTypeBuilder<RoomType> builder)
        {
            builder.HasData(new RoomType("Квартира", (decimal)1.2) { ID = 1 });
            builder.HasData(new RoomType("Дом", (decimal)1.3) { ID = 2 });
            builder.HasData(new RoomType("Офис", (decimal)1) { ID = 3 });
            builder.HasData(new RoomType("Другое", (decimal)1.5) { ID = 4 });
        }
    }
}
