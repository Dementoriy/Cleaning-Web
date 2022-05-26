using Microsoft.EntityFrameworkCore.Migrations;

namespace CleaningDLL.Migrations
{
    public partial class approximateTimeToService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApproximateTime",
                table: "Service",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 1,
                column: "ApproximateTime",
                value: "2 - 4 часа");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 2,
                column: "ApproximateTime",
                value: "6 - 8 часов");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 3,
                column: "ApproximateTime",
                value: "6 - 8 часа");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 4,
                column: "ApproximateTime",
                value: "4 - 7 часа");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 5,
                column: "ApproximateTime",
                value: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 6,
                column: "ApproximateTime",
                value: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 7,
                column: "ApproximateTime",
                value: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 8,
                column: "ApproximateTime",
                value: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 9,
                column: "ApproximateTime",
                value: "");

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 10,
                column: "ApproximateTime",
                value: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApproximateTime",
                table: "Service");
        }
    }
}
