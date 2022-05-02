using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CleaningDLL.Migrations
{
    public partial class HumanAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Street = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    HouseNumber = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Building = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Entrance = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Apartment_Number = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Brigade",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Smena_Number = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brigade", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsOldClient = table.Column<bool>(type: "boolean", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    MiddleName = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "InventoryType",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryType", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Position",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NamePosition = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Position", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ReferenceUnitsOfMeasurement",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Unit = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Description = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferenceUnitsOfMeasurement", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Provider",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ProviderTelefonNumber = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    AddressID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provider", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Provider_Address_AddressID",
                        column: x => x.AddressID,
                        principalTable: "Address",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InventoryName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    InventoryTypeID = table.Column<int>(type: "integer", nullable: false),
                    UseTime = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LifeTime = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DateOfReceiving = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Inventory_InventoryType_InventoryTypeID",
                        column: x => x.InventoryTypeID,
                        principalTable: "InventoryType",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ServiceName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    InventoryTypeID = table.Column<int>(type: "integer", nullable: false),
                    Time = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Service_InventoryType_InventoryTypeID",
                        column: x => x.InventoryTypeID,
                        principalTable: "InventoryType",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PassportData = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    PositionID = table.Column<int>(type: "integer", nullable: false),
                    BrigadeID = table.Column<int>(type: "integer", nullable: true),
                    EmploymentDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Login = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Password = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    MiddleName = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Employee_Brigade_BrigadeID",
                        column: x => x.BrigadeID,
                        principalTable: "Brigade",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employee_Position_PositionID",
                        column: x => x.PositionID,
                        principalTable: "Position",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Consumable",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConsumableName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    CurrentPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    ReferenceUnitsOfMeasurementID = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consumable", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Consumable_ReferenceUnitsOfMeasurement_ReferenceUnitsOfMeas~",
                        column: x => x.ReferenceUnitsOfMeasurementID,
                        principalTable: "ReferenceUnitsOfMeasurement",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BrigadeInventory",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BrigadeID = table.Column<int>(type: "integer", nullable: false),
                    InventoryID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrigadeInventory", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BrigadeInventory_Brigade_BrigadeID",
                        column: x => x.BrigadeID,
                        principalTable: "Brigade",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BrigadeInventory_Inventory_InventoryID",
                        column: x => x.InventoryID,
                        principalTable: "Inventory",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contract",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeID = table.Column<int>(type: "integer", nullable: false),
                    ClientID = table.Column<int>(type: "integer", nullable: false),
                    DateOfContract = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contract", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Contract_Client_ClientID",
                        column: x => x.ClientID,
                        principalTable: "Client",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Contract_Employee_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employee",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ClientID = table.Column<int>(type: "integer", nullable: false),
                    EmployeeID = table.Column<int>(type: "integer", nullable: false),
                    AddressID = table.Column<int>(type: "integer", nullable: false),
                    BrigadeID = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    FinalPrice = table.Column<int>(type: "integer", nullable: false),
                    ApproximateTime = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Order_Address_AddressID",
                        column: x => x.AddressID,
                        principalTable: "Address",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Brigade_BrigadeID",
                        column: x => x.BrigadeID,
                        principalTable: "Brigade",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Client_ClientID",
                        column: x => x.ClientID,
                        principalTable: "Client",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Employee_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employee",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConsumptionRate",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Consumption = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    ConsumableID = table.Column<int>(type: "integer", nullable: false),
                    ReferenceUnitsOfMeasurementID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsumptionRate", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConsumptionRate_Consumable_ConsumableID",
                        column: x => x.ConsumableID,
                        principalTable: "Consumable",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConsumptionRate_ReferenceUnitsOfMeasurement_ReferenceUnitsO~",
                        column: x => x.ReferenceUnitsOfMeasurementID,
                        principalTable: "ReferenceUnitsOfMeasurement",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryContent",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConsumableID = table.Column<int>(type: "integer", nullable: false),
                    DeliveryContentAmount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryContent", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DeliveryContent_Consumable_ConsumableID",
                        column: x => x.ConsumableID,
                        principalTable: "Consumable",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RequisitionContent",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConsumableID = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequisitionContent", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RequisitionContent_Consumable_ConsumableID",
                        column: x => x.ConsumableID,
                        principalTable: "Consumable",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProvidedService",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderID = table.Column<int>(type: "integer", nullable: false),
                    ServiceID = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProvidedService", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ProvidedService_Order_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Order",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProvidedService_Service_ServiceID",
                        column: x => x.ServiceID,
                        principalTable: "Service",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConsumablesService",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ServiceID = table.Column<int>(type: "integer", nullable: false),
                    ConsumptionRateID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsumablesService", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConsumablesService_ConsumptionRate_ConsumptionRateID",
                        column: x => x.ConsumptionRateID,
                        principalTable: "ConsumptionRate",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConsumablesService_Service_ServiceID",
                        column: x => x.ServiceID,
                        principalTable: "Service",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Delivery",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProviderID = table.Column<int>(type: "integer", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DeliveryCost = table.Column<decimal>(type: "numeric", nullable: false),
                    DeliveryContentID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delivery", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Delivery_DeliveryContent_DeliveryContentID",
                        column: x => x.DeliveryContentID,
                        principalTable: "DeliveryContent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Delivery_Provider_ProviderID",
                        column: x => x.ProviderID,
                        principalTable: "Provider",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseRequisition",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EmployeeID = table.Column<int>(type: "integer", nullable: false),
                    ProviderID = table.Column<int>(type: "integer", nullable: false),
                    RequisitionContentID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseRequisition", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PurchaseRequisition_Employee_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employee",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseRequisition_Provider_ProviderID",
                        column: x => x.ProviderID,
                        principalTable: "Provider",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseRequisition_RequisitionContent_RequisitionContentID",
                        column: x => x.RequisitionContentID,
                        principalTable: "RequisitionContent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryContract",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeID = table.Column<int>(type: "integer", nullable: false),
                    ProviderID = table.Column<int>(type: "integer", nullable: false),
                    PurchaseRequisitionID = table.Column<int>(type: "integer", nullable: false),
                    DeliveryContractDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryContract", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DeliveryContract_Employee_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employee",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryContract_Provider_ProviderID",
                        column: x => x.ProviderID,
                        principalTable: "Provider",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryContract_PurchaseRequisition_PurchaseRequisitionID",
                        column: x => x.PurchaseRequisitionID,
                        principalTable: "PurchaseRequisition",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Brigade",
                columns: new[] { "ID", "Smena_Number" },
                values: new object[,]
                {
                    { 1, "Смена1" },
                    { 2, "Смена2" }
                });

            migrationBuilder.InsertData(
                table: "InventoryType",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { 1, "Пылесос" },
                    { 2, "Стеклоочиститель" },
                    { 3, "Вакуумный очиститель" },
                    { 4, "Дезинфектор" }
                });

            migrationBuilder.InsertData(
                table: "Position",
                columns: new[] { "ID", "Description", "NamePosition" },
                values: new object[,]
                {
                    { 1, "Обрабатывать заявки", "Администратор" },
                    { 2, "Главный клинер. Заведует бригадой", "Бригадир" },
                    { 3, "Совершать уборку на объекте", "Клинер" }
                });

            migrationBuilder.InsertData(
                table: "Employee",
                columns: new[] { "ID", "BrigadeID", "EmploymentDate", "Login", "MiddleName", "Name", "PassportData", "Password", "PhoneNumber", "PositionID", "Surname" },
                values: new object[,]
                {
                    { 7, 2, new DateTime(2021, 12, 2, 10, 0, 0, 0, DateTimeKind.Unspecified), null, "Константинович", "Дмитрий", "1111888888", null, "+79229357609", 3, "Целищев" },
                    { 5, 1, new DateTime(2021, 12, 1, 11, 30, 0, 0, DateTimeKind.Unspecified), null, "Владимирович", "Роман", "1111666666", null, "+79091324445", 3, "Суслов" },
                    { 4, 1, new DateTime(2021, 12, 1, 11, 30, 0, 0, DateTimeKind.Unspecified), null, "Игоревич", "Дмитрий", "1111555555", null, "+79536952565", 3, "Москалев" },
                    { 3, 2, new DateTime(2021, 11, 30, 11, 0, 0, 0, DateTimeKind.Unspecified), "brigadir2", "Николаевич", "Александр", "1111444444", "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5", "+79123646993", 2, "Заболотский" },
                    { 2, 1, new DateTime(2021, 11, 30, 11, 0, 0, 0, DateTimeKind.Unspecified), "brigadir1", "Анатольевич", "Иван", "1111333333", "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", "+79536856008", 2, "Бессонов" },
                    { 1, null, new DateTime(2021, 11, 30, 10, 30, 0, 0, DateTimeKind.Unspecified), "admin", "Михайлович", "Дмитрий", "1111222222", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", "+79536773183", 1, "Ведерников" },
                    { 6, 2, new DateTime(2021, 12, 2, 10, 0, 0, 0, DateTimeKind.Unspecified), null, "Игоревич", "Максим", "1111777777", null, "+79123644673", 3, "Орлов" }
                });

            migrationBuilder.InsertData(
                table: "Service",
                columns: new[] { "ID", "Description", "InventoryTypeID", "Price", "ServiceName", "Time" },
                values: new object[,]
                {
                    { 10, "Дезинфекция помещений, твердых поверхносте, воздуха. Цена за 1м2.", 4, 40m, "Дезинфекция", 30 },
                    { 9, "Химчистка ковров, матрасов. Цена за 1м2.", 3, 150m, "Химчистка ковров", 300 },
                    { 7, "Химчистка диванов. Мягкой мебели. Цена за 1 место.", 3, 300m, "Химчистка диванов", 3600 },
                    { 6, "Мойка стеклянных дверей балконов и лоджий. Цена за 1 дверь.", 2, 500m, "Мойка стеклянных дверей", 120 },
                    { 5, "Мойка окон. Цена за 1 створу.", 2, 250m, "Мойка окон", 60 },
                    { 4, "Уборка офисных помещений. Цена за 1м2.", 1, 50m, "Уборка офисов", 100 },
                    { 3, "Уборка на объекте после ремонта/стройки (Обильное загрязнение). Цена за 1м2.", 1, 80m, "Послестроительная уборка", 220 },
                    { 2, "Генеральная уборка. Цена за 1м2.", 1, 70m, "Генеральная уборка", 220 },
                    { 8, "Химчистка кресел. Мягкой мебели. Цена за 1 кресло.", 3, 300m, "Химчистка кресел", 3600 },
                    { 1, "Поддерживающая уборка. Объект должен быть в незапущенном состоянии. Цена за 1м2.", 1, 40m, "Экспресс уборка", 100 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BrigadeInventory_BrigadeID",
                table: "BrigadeInventory",
                column: "BrigadeID");

            migrationBuilder.CreateIndex(
                name: "IX_BrigadeInventory_InventoryID",
                table: "BrigadeInventory",
                column: "InventoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Client_PhoneNumber",
                table: "Client",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Consumable_ConsumableName",
                table: "Consumable",
                column: "ConsumableName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Consumable_ReferenceUnitsOfMeasurementID",
                table: "Consumable",
                column: "ReferenceUnitsOfMeasurementID");

            migrationBuilder.CreateIndex(
                name: "IX_ConsumablesService_ConsumptionRateID",
                table: "ConsumablesService",
                column: "ConsumptionRateID");

            migrationBuilder.CreateIndex(
                name: "IX_ConsumablesService_ServiceID",
                table: "ConsumablesService",
                column: "ServiceID");

            migrationBuilder.CreateIndex(
                name: "IX_ConsumptionRate_ConsumableID",
                table: "ConsumptionRate",
                column: "ConsumableID");

            migrationBuilder.CreateIndex(
                name: "IX_ConsumptionRate_ReferenceUnitsOfMeasurementID",
                table: "ConsumptionRate",
                column: "ReferenceUnitsOfMeasurementID");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_ClientID",
                table: "Contract",
                column: "ClientID");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_EmployeeID",
                table: "Contract",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Delivery_DeliveryContentID",
                table: "Delivery",
                column: "DeliveryContentID");

            migrationBuilder.CreateIndex(
                name: "IX_Delivery_ProviderID",
                table: "Delivery",
                column: "ProviderID");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryContent_ConsumableID",
                table: "DeliveryContent",
                column: "ConsumableID");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryContract_EmployeeID",
                table: "DeliveryContract",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryContract_ProviderID",
                table: "DeliveryContract",
                column: "ProviderID");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryContract_PurchaseRequisitionID",
                table: "DeliveryContract",
                column: "PurchaseRequisitionID");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_BrigadeID",
                table: "Employee",
                column: "BrigadeID");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Login",
                table: "Employee",
                column: "Login",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_PassportData",
                table: "Employee",
                column: "PassportData",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Password",
                table: "Employee",
                column: "Password",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_PhoneNumber",
                table: "Employee",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_PositionID",
                table: "Employee",
                column: "PositionID");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_InventoryTypeID",
                table: "Inventory",
                column: "InventoryTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_AddressID",
                table: "Order",
                column: "AddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_BrigadeID",
                table: "Order",
                column: "BrigadeID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_ClientID",
                table: "Order",
                column: "ClientID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_EmployeeID",
                table: "Order",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_ProvidedService_OrderID",
                table: "ProvidedService",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_ProvidedService_ServiceID",
                table: "ProvidedService",
                column: "ServiceID");

            migrationBuilder.CreateIndex(
                name: "IX_Provider_AddressID",
                table: "Provider",
                column: "AddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Provider_CompanyName",
                table: "Provider",
                column: "CompanyName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Provider_ProviderTelefonNumber",
                table: "Provider",
                column: "ProviderTelefonNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequisition_EmployeeID",
                table: "PurchaseRequisition",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequisition_ProviderID",
                table: "PurchaseRequisition",
                column: "ProviderID");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequisition_RequisitionContentID",
                table: "PurchaseRequisition",
                column: "RequisitionContentID");

            migrationBuilder.CreateIndex(
                name: "IX_ReferenceUnitsOfMeasurement_Unit",
                table: "ReferenceUnitsOfMeasurement",
                column: "Unit",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequisitionContent_ConsumableID",
                table: "RequisitionContent",
                column: "ConsumableID");

            migrationBuilder.CreateIndex(
                name: "IX_Service_InventoryTypeID",
                table: "Service",
                column: "InventoryTypeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BrigadeInventory");

            migrationBuilder.DropTable(
                name: "ConsumablesService");

            migrationBuilder.DropTable(
                name: "Contract");

            migrationBuilder.DropTable(
                name: "Delivery");

            migrationBuilder.DropTable(
                name: "DeliveryContract");

            migrationBuilder.DropTable(
                name: "ProvidedService");

            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.DropTable(
                name: "ConsumptionRate");

            migrationBuilder.DropTable(
                name: "DeliveryContent");

            migrationBuilder.DropTable(
                name: "PurchaseRequisition");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Provider");

            migrationBuilder.DropTable(
                name: "RequisitionContent");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "InventoryType");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Consumable");

            migrationBuilder.DropTable(
                name: "Brigade");

            migrationBuilder.DropTable(
                name: "Position");

            migrationBuilder.DropTable(
                name: "ReferenceUnitsOfMeasurement");
        }
    }
}
