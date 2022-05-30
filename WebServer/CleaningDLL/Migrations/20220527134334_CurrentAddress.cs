using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class CurrentAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "ClientAddresses");

            migrationBuilder.AddColumn<bool>(
                name: "CurrentAddress",
                table: "Address",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentAddress",
                table: "Address");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ClientAddresses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
