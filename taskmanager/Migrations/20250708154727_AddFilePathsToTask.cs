using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmanager.Migrations
{
    /// <inheritdoc />
    public partial class AddFilePathsToTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachmentPath",
                table: "tasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SubmissionFilePath",
                table: "tasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentPath",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "SubmissionFilePath",
                table: "tasks");
        }
    }
}
