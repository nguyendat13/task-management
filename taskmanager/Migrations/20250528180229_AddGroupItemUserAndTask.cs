using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class AddGroupItemUserAndTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_groups_tasks_TaskId",
                table: "groups");

            migrationBuilder.DropIndex(
                name: "IX_groups_TaskId",
                table: "groups");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "groups");

            migrationBuilder.CreateTable(
                name: "group_item_task",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_group_item_task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_group_item_task_groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_group_item_task_tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "group_item_user",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsLeader = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_group_item_user", x => x.Id);
                    table.ForeignKey(
                        name: "FK_group_item_user_groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_group_item_user_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_group_item_task_GroupId",
                table: "group_item_task",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_group_item_task_TaskId",
                table: "group_item_task",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_group_item_user_GroupId",
                table: "group_item_user",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_group_item_user_UserId",
                table: "group_item_user",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "group_item_task");

            migrationBuilder.DropTable(
                name: "group_item_user");

            migrationBuilder.AddColumn<int>(
                name: "TaskId",
                table: "groups",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_groups_TaskId",
                table: "groups",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_groups_tasks_TaskId",
                table: "groups",
                column: "TaskId",
                principalTable: "tasks",
                principalColumn: "Id");
        }
    }
}
