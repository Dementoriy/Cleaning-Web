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
            builder.HasData(new Service("Экспресс уборка", "Сухая, влажная уборка полов, плинтусов. Протирка пыли на доступных поверхностях. Чистка и дезинфекция сантехники. Протирка фасадов кухонного гарнитура. Чисткка стеновой панели фартука. Мытьё кухонной плиты снаружи. Удаление пыли с кухонной техники. Мытьё посуды \"Одна заполненная раковина\" Проветривание помещения Вынос мусора.", 40, 1, 100, null, true, "2 - 4 часа") { ID = 1, UnitsID = 1 });
            builder.HasData(new Service("Генеральная уборка", "C помощью пылесоса и парогенератора удаляется пыль. Устраняется грязь с поверхности кроватей, диванов, кресел, мебели, электроники, люстр, стеклянных перегородок и зеркал, штор. Дезинфекция сантехники: унитазов, ванн, душевых кабин, раковин.Устранение следов жира, обработка кухонной техники снаружи и внутри. Мойка кафельной плитки и очистка швов в ванной комнате.", 70, 1, 220, null, true, "6 - 8 часов") { ID = 2, UnitsID = 1 });
            builder.HasData(new Service("Послестроительная уборка", "Расширенная генеральная уборка, включающая в себя: устранение остатков лакокрасочных составов, извести, скотча. Мытье стеклянных и зеркальных поверхностей без разводов. Тщательная очистка напольных покрытий. Обеззараживание сантехники. Сбор и вывоз строительного мусора.", 80, 1, 220, null, true, "6 - 8 часа") { ID = 3, UnitsID = 1 });
            builder.HasData(new Service("Комплексная уборка", "Мойка полов, плинтусов, стекляных и зеркальных поверхностей. Удаление загрязнений с подоконников. Удаление пыли с оргтехники и горизонтальных поверхностей. Полив цветов. Вынос мусора. Пылесосим ковры. Раскладываем вещи на места. Застилаем кровать и меняем постельное.", 50, 1, 100, null, true, "4 - 7 часа") { ID = 4, UnitsID = 1 });
            builder.HasData(new Service("Мойка окон", "Мойка стекляных окон и дверей.", 250, 2, 60, null, false, "") { ID = 5, UnitsID = 2 });
            builder.HasData(new Service("Мойка стеклянных дверей", "Мойка стеклянных дверей балконов и лоджий. Цена за 1 дверь.", 500, 2, 120, null, false, "") { ID = 6, UnitsID = 2 });
            builder.HasData(new Service("Химчистка диванов", "Профессиональная очистка мягкой мебели и ковров химией.", 300, 3, 3600, null, false, "") { ID = 7, UnitsID = 2 });
            builder.HasData(new Service("Химчистка кресел", "Химчистка кресел. Мягкой мебели. Цена за 1 кресло.", 300, 3, 3600, null, false, "") { ID = 8, UnitsID = 2 });
            builder.HasData(new Service("Химчистка ковров", "Химчистка ковров, матрасов. Цена за 1м2.", 150, 3, 300, null, false, "") { ID = 9, UnitsID = 1 });
            builder.HasData(new Service("Дезинфекция", "Дезинфекция воздуха и поверхностей.", 40, 4, 30, null, false, "") { ID = 10, UnitsID = 2 });
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
