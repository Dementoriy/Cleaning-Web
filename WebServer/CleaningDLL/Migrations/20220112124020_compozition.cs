using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class compozition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContractID",
                table: "Order",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_ContractID",
                table: "Order",
                column: "ContractID");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Contract_ContractID",
                table: "Order",
                column: "ContractID",
                principalTable: "Contract",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Contract_ContractID",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_ContractID",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ContractID",
                table: "Order");
        }
    }
}
