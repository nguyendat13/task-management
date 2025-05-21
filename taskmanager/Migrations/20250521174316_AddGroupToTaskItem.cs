using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class AddGroupToTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_ReceiverId",
                table: "messages");

            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_SenderId",
                table: "messages");

            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_UserId",
                table: "messages");

            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_UserId1",
                table: "messages");

            migrationBuilder.DropIndex(
                name: "IX_messages_UserId",
                table: "messages");

            migrationBuilder.DropIndex(
                name: "IX_messages_UserId1",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "messages");

            migrationBuilder.RenameColumn(
                name: "Priority",
                table: "tasks",
                newName: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_GroupId",
                table: "tasks",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_ReceiverId",
                table: "messages",
                column: "ReceiverId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_SenderId",
                table: "messages",
                column: "SenderId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tasks_groups_GroupId",
                table: "tasks",
                column: "GroupId",
                principalTable: "groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_ReceiverId",
                table: "messages");

            migrationBuilder.DropForeignKey(
                name: "FK_messages_users_SenderId",
                table: "messages");

            migrationBuilder.DropForeignKey(
                name: "FK_tasks_groups_GroupId",
                table: "tasks");

            migrationBuilder.DropIndex(
                name: "IX_tasks_GroupId",
                table: "tasks");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "tasks",
                newName: "Priority");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "messages",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_messages_UserId",
                table: "messages",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_messages_UserId1",
                table: "messages",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_ReceiverId",
                table: "messages",
                column: "ReceiverId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_SenderId",
                table: "messages",
                column: "SenderId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_UserId",
                table: "messages",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_messages_users_UserId1",
                table: "messages",
                column: "UserId1",
                principalTable: "users",
                principalColumn: "Id");
        }
    }
}
