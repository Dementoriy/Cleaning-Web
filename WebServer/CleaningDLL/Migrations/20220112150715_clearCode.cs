using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class clearCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BrigadeInventory_Brigade_BrigadeID",
                table: "BrigadeInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_BrigadeInventory_Inventory_InventoryID",
                table: "BrigadeInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumablesService_ConsumptionRate_ConsumptionRateID",
                table: "ConsumablesService");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumablesService_Service_ServiceID",
                table: "ConsumablesService");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumptionRate_Consumable_ConsumableID",
                table: "ConsumptionRate");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumptionRate_ReferenceUnitsOfMeasurement_ReferenceUnitsO~",
                table: "ConsumptionRate");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Client_ClientID",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Employee_EmployeeID",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Delivery_DeliveryContent_DeliveryContentID",
                table: "Delivery");

            migrationBuilder.DropForeignKey(
                name: "FK_Delivery_Provider_ProviderID",
                table: "Delivery");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContent_Consumable_ConsumableID",
                table: "DeliveryContent");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_Employee_EmployeeID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_Provider_ProviderID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_PurchaseRequisition_PurchaseRequisitionID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_InventoryType_InventoryTypeID",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Address_AddressID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Client_ClientID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Employee_EmployeeID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Provider_Address_AddressID",
                table: "Provider");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequisition_Employee_EmployeeID",
                table: "PurchaseRequisition");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequisition_Provider_ProviderID",
                table: "PurchaseRequisition");

            migrationBuilder.DropForeignKey(
                name: "FK_RequisitionContent_Consumable_ConsumableID",
                table: "RequisitionContent");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "RequisitionContent",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "PurchaseRequisition",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "PurchaseRequisition",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "AddressID",
                table: "Provider",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ClientID",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "AddressID",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "InventoryTypeID",
                table: "Inventory",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PurchaseRequisitionID",
                table: "DeliveryContract",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "DeliveryContract",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "DeliveryContract",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "DeliveryContent",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "Delivery",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryContentID",
                table: "Delivery",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "Contract",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ClientID",
                table: "Contract",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ReferenceUnitsOfMeasurementID",
                table: "ConsumptionRate",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "ConsumptionRate",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ServiceID",
                table: "ConsumablesService",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumptionRateID",
                table: "ConsumablesService",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "InventoryID",
                table: "BrigadeInventory",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "BrigadeID",
                table: "BrigadeInventory",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_BrigadeInventory_Brigade_BrigadeID",
                table: "BrigadeInventory",
                column: "BrigadeID",
                principalTable: "Brigade",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BrigadeInventory_Inventory_InventoryID",
                table: "BrigadeInventory",
                column: "InventoryID",
                principalTable: "Inventory",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumablesService_ConsumptionRate_ConsumptionRateID",
                table: "ConsumablesService",
                column: "ConsumptionRateID",
                principalTable: "ConsumptionRate",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumablesService_Service_ServiceID",
                table: "ConsumablesService",
                column: "ServiceID",
                principalTable: "Service",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumptionRate_Consumable_ConsumableID",
                table: "ConsumptionRate",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumptionRate_ReferenceUnitsOfMeasurement_ReferenceUnitsO~",
                table: "ConsumptionRate",
                column: "ReferenceUnitsOfMeasurementID",
                principalTable: "ReferenceUnitsOfMeasurement",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Client_ClientID",
                table: "Contract",
                column: "ClientID",
                principalTable: "Client",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Employee_EmployeeID",
                table: "Contract",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Delivery_DeliveryContent_DeliveryContentID",
                table: "Delivery",
                column: "DeliveryContentID",
                principalTable: "DeliveryContent",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Delivery_Provider_ProviderID",
                table: "Delivery",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContent_Consumable_ConsumableID",
                table: "DeliveryContent",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_Employee_EmployeeID",
                table: "DeliveryContract",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_Provider_ProviderID",
                table: "DeliveryContract",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_PurchaseRequisition_PurchaseRequisitionID",
                table: "DeliveryContract",
                column: "PurchaseRequisitionID",
                principalTable: "PurchaseRequisition",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_InventoryType_InventoryTypeID",
                table: "Inventory",
                column: "InventoryTypeID",
                principalTable: "InventoryType",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Address_AddressID",
                table: "Order",
                column: "AddressID",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Client_ClientID",
                table: "Order",
                column: "ClientID",
                principalTable: "Client",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Employee_EmployeeID",
                table: "Order",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Provider_Address_AddressID",
                table: "Provider",
                column: "AddressID",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequisition_Employee_EmployeeID",
                table: "PurchaseRequisition",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequisition_Provider_ProviderID",
                table: "PurchaseRequisition",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RequisitionContent_Consumable_ConsumableID",
                table: "RequisitionContent",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BrigadeInventory_Brigade_BrigadeID",
                table: "BrigadeInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_BrigadeInventory_Inventory_InventoryID",
                table: "BrigadeInventory");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumablesService_ConsumptionRate_ConsumptionRateID",
                table: "ConsumablesService");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumablesService_Service_ServiceID",
                table: "ConsumablesService");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumptionRate_Consumable_ConsumableID",
                table: "ConsumptionRate");

            migrationBuilder.DropForeignKey(
                name: "FK_ConsumptionRate_ReferenceUnitsOfMeasurement_ReferenceUnitsO~",
                table: "ConsumptionRate");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Client_ClientID",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_Employee_EmployeeID",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Delivery_DeliveryContent_DeliveryContentID",
                table: "Delivery");

            migrationBuilder.DropForeignKey(
                name: "FK_Delivery_Provider_ProviderID",
                table: "Delivery");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContent_Consumable_ConsumableID",
                table: "DeliveryContent");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_Employee_EmployeeID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_Provider_ProviderID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryContract_PurchaseRequisition_PurchaseRequisitionID",
                table: "DeliveryContract");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_InventoryType_InventoryTypeID",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Address_AddressID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Client_ClientID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Employee_EmployeeID",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Provider_Address_AddressID",
                table: "Provider");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequisition_Employee_EmployeeID",
                table: "PurchaseRequisition");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequisition_Provider_ProviderID",
                table: "PurchaseRequisition");

            migrationBuilder.DropForeignKey(
                name: "FK_RequisitionContent_Consumable_ConsumableID",
                table: "RequisitionContent");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "RequisitionContent",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "PurchaseRequisition",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "PurchaseRequisition",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddressID",
                table: "Provider",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientID",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddressID",
                table: "Order",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InventoryTypeID",
                table: "Inventory",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PurchaseRequisitionID",
                table: "DeliveryContract",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "DeliveryContract",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "DeliveryContract",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "DeliveryContent",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProviderID",
                table: "Delivery",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryContentID",
                table: "Delivery",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "Contract",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientID",
                table: "Contract",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ReferenceUnitsOfMeasurementID",
                table: "ConsumptionRate",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConsumableID",
                table: "ConsumptionRate",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ServiceID",
                table: "ConsumablesService",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConsumptionRateID",
                table: "ConsumablesService",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InventoryID",
                table: "BrigadeInventory",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BrigadeID",
                table: "BrigadeInventory",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BrigadeInventory_Brigade_BrigadeID",
                table: "BrigadeInventory",
                column: "BrigadeID",
                principalTable: "Brigade",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BrigadeInventory_Inventory_InventoryID",
                table: "BrigadeInventory",
                column: "InventoryID",
                principalTable: "Inventory",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumablesService_ConsumptionRate_ConsumptionRateID",
                table: "ConsumablesService",
                column: "ConsumptionRateID",
                principalTable: "ConsumptionRate",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumablesService_Service_ServiceID",
                table: "ConsumablesService",
                column: "ServiceID",
                principalTable: "Service",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumptionRate_Consumable_ConsumableID",
                table: "ConsumptionRate",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ConsumptionRate_ReferenceUnitsOfMeasurement_ReferenceUnitsO~",
                table: "ConsumptionRate",
                column: "ReferenceUnitsOfMeasurementID",
                principalTable: "ReferenceUnitsOfMeasurement",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Client_ClientID",
                table: "Contract",
                column: "ClientID",
                principalTable: "Client",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_Employee_EmployeeID",
                table: "Contract",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Delivery_DeliveryContent_DeliveryContentID",
                table: "Delivery",
                column: "DeliveryContentID",
                principalTable: "DeliveryContent",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Delivery_Provider_ProviderID",
                table: "Delivery",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContent_Consumable_ConsumableID",
                table: "DeliveryContent",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_Employee_EmployeeID",
                table: "DeliveryContract",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_Provider_ProviderID",
                table: "DeliveryContract",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryContract_PurchaseRequisition_PurchaseRequisitionID",
                table: "DeliveryContract",
                column: "PurchaseRequisitionID",
                principalTable: "PurchaseRequisition",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_InventoryType_InventoryTypeID",
                table: "Inventory",
                column: "InventoryTypeID",
                principalTable: "InventoryType",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Address_AddressID",
                table: "Order",
                column: "AddressID",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Client_ClientID",
                table: "Order",
                column: "ClientID",
                principalTable: "Client",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Employee_EmployeeID",
                table: "Order",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Provider_Address_AddressID",
                table: "Provider",
                column: "AddressID",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequisition_Employee_EmployeeID",
                table: "PurchaseRequisition",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequisition_Provider_ProviderID",
                table: "PurchaseRequisition",
                column: "ProviderID",
                principalTable: "Provider",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RequisitionContent_Consumable_ConsumableID",
                table: "RequisitionContent",
                column: "ConsumableID",
                principalTable: "Consumable",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
