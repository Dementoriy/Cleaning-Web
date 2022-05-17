using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CleaningDLL.Migrations
{
    public partial class IsMainService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Service",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "AuthTokens",
                columns: table => new
                {
                    Token = table.Column<string>(type: "text", nullable: false),
                    TokenTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthTokens", x => x.Token);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.ID);
                });

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 1,
                column: "IsMain",
                value: true);

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 2,
                column: "IsMain",
                value: true);

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 3,
                column: "IsMain",
                value: true);

            migrationBuilder.UpdateData(
                table: "Service",
                keyColumn: "ID",
                keyValue: 4,
                column: "IsMain",
                value: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthTokens");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Service");
        }
    }
}
