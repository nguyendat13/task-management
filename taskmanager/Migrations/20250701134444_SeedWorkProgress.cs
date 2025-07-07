using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class SeedWorkProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "work_progress",
                columns: new[] { "Id", "Status" },
                values: new object[,]
                {
                    { 1, "Đang chờ" },
                    { 2, "Đang thực hiện" },
                    { 3, "Đã hoàn thành" },
                    { 4, "Đang review" },
                    { 5, "Đã duyệt" },
                    { 6, "Tạm dừng" },
                    { 7, "Trễ hạn" },
                    { 8, "Đã hủy nhiệm vụ" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "work_progress",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
