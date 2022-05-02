using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class fixAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "Address",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Locality",
                table: "Address",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "District",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Locality",
                table: "Address");
        }
    }
}
