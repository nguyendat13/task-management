using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableNoti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_notifications_GroupId",
                table: "notifications",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications",
                column: "GroupId",
                principalTable: "groups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications");

            migrationBuilder.DropIndex(
                name: "IX_notifications_GroupId",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "notifications");
        }
    }
}
