using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class AddElementInTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachmentOriginalName",
                table: "tasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SubmissionOriginalName",
                table: "tasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentOriginalName",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "SubmissionOriginalName",
                table: "tasks");
        }
    }
}
