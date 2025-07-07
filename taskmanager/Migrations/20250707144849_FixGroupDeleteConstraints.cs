using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class FixGroupDeleteConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications",
                column: "GroupId",
                principalTable: "groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_notifications_groups_GroupId",
                table: "notifications",
                column: "GroupId",
                principalTable: "groups",
                principalColumn: "Id");
        }
    }
}
