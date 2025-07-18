using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class TableTaskAssignee1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskAssignee_tasks_TaskItemId",
                table: "TaskAssignee");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskAssignee_users_UserId",
                table: "TaskAssignee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskAssignee",
                table: "TaskAssignee");

            migrationBuilder.RenameTable(
                name: "TaskAssignee",
                newName: "taskassignee");

            migrationBuilder.RenameIndex(
                name: "IX_TaskAssignee_UserId",
                table: "taskassignee",
                newName: "IX_taskassignee_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TaskAssignee_TaskItemId",
                table: "taskassignee",
                newName: "IX_taskassignee_TaskItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_taskassignee",
                table: "taskassignee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_taskassignee_tasks_TaskItemId",
                table: "taskassignee",
                column: "TaskItemId",
                principalTable: "tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_taskassignee_users_UserId",
                table: "taskassignee",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskassignee_tasks_TaskItemId",
                table: "taskassignee");

            migrationBuilder.DropForeignKey(
                name: "FK_taskassignee_users_UserId",
                table: "taskassignee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_taskassignee",
                table: "taskassignee");

            migrationBuilder.RenameTable(
                name: "taskassignee",
                newName: "TaskAssignee");

            migrationBuilder.RenameIndex(
                name: "IX_taskassignee_UserId",
                table: "TaskAssignee",
                newName: "IX_TaskAssignee_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_taskassignee_TaskItemId",
                table: "TaskAssignee",
                newName: "IX_TaskAssignee_TaskItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskAssignee",
                table: "TaskAssignee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignee_tasks_TaskItemId",
                table: "TaskAssignee",
                column: "TaskItemId",
                principalTable: "tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskAssignee_users_UserId",
                table: "TaskAssignee",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
