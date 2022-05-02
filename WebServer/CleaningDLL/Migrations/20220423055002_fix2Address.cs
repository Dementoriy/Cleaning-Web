using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class fix2Address : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Locality",
                table: "Address",
                newName: "Settlement");

            migrationBuilder.RenameColumn(
                name: "District",
                table: "Address",
                newName: "CityDistrict");

            migrationBuilder.RenameColumn(
                name: "Building",
                table: "Address",
                newName: "Block");

            migrationBuilder.RenameColumn(
                name: "Apartment_Number",
                table: "Address",
                newName: "ApartmentNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Settlement",
                table: "Address",
                newName: "Locality");

            migrationBuilder.RenameColumn(
                name: "CityDistrict",
                table: "Address",
                newName: "District");

            migrationBuilder.RenameColumn(
                name: "Block",
                table: "Address",
                newName: "Building");

            migrationBuilder.RenameColumn(
                name: "ApartmentNumber",
                table: "Address",
                newName: "Apartment_Number");
        }
    }
}
