using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class ElementNoti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RequestUserId",
                table: "notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_notifications_RequestUserId",
                table: "notifications",
                column: "RequestUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_notifications_users_RequestUserId",
                table: "notifications",
                column: "RequestUserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notifications_users_RequestUserId",
                table: "notifications");

            migrationBuilder.DropIndex(
                name: "IX_notifications_RequestUserId",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "RequestUserId",
                table: "notifications");
        }
    }
}
