using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using taskmanager.Models;

namespace taskmanager.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Personal> Personals { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<WorkProgress> WorkProgresses { get; set; }
        public DbSet<GroupItemUser> GroupItemUsers { get; set; }
        public DbSet<GroupItemTask> GroupItemTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Quan hệ Sender/Receiver rõ ràng
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // Quan hệ TaskItem - Group (nhiều TaskItem thuộc 1 Group)
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.Group)
                .WithMany(g => g.Tasks)
                .HasForeignKey(t => t.GroupId)
                .OnDelete(DeleteBehavior.SetNull);
        }

    }

}
