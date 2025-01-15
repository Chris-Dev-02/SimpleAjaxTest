using Microsoft.EntityFrameworkCore;

namespace SimpleAjaxTest.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() 
        { 
        
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 
        
        }

        public DbSet<PostModel> Posts { get; set; }
    }
}
