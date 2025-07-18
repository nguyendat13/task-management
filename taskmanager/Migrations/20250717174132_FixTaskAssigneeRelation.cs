using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class FixTaskAssigneeRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskassignee_tasks_TaskItemId",
                table: "taskassignee");

            migrationBuilder.DropIndex(
                name: "IX_taskassignee_TaskItemId",
                table: "taskassignee");

            migrationBuilder.DropColumn(
                name: "TaskItemId",
                table: "taskassignee");

            migrationBuilder.CreateIndex(
                name: "IX_taskassignee_TaskId",
                table: "taskassignee",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_taskassignee_tasks_TaskId",
                table: "taskassignee",
                column: "TaskId",
                principalTable: "tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskassignee_tasks_TaskId",
                table: "taskassignee");

            migrationBuilder.DropIndex(
                name: "IX_taskassignee_TaskId",
                table: "taskassignee");

            migrationBuilder.AddColumn<int>(
                name: "TaskItemId",
                table: "taskassignee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_taskassignee_TaskItemId",
                table: "taskassignee",
                column: "TaskItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_taskassignee_tasks_TaskItemId",
                table: "taskassignee",
                column: "TaskItemId",
                principalTable: "tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
