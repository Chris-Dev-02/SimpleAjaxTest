using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleAjaxTest.Migrations
{
    /// <inheritdoc />
    public partial class AddPostPublishedBy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublishedBy",
                table: "Posts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublishedBy",
                table: "Posts");
        }
    }
}
