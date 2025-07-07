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

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.RequestUser)
                .WithMany(u => u.SentRequests)
                .HasForeignKey(n => n.RequestUserId)
                .OnDelete(DeleteBehavior.Restrict); // tránh lỗi khi xóa user gửi request

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Group)
                .WithMany()
                .HasForeignKey(n => n.GroupId)
                .OnDelete(DeleteBehavior.Cascade); // xóa group sẽ xóa notification liên quan

            modelBuilder.Entity<GroupItemUser>()
                .HasOne(giu => giu.Group)
                .WithMany()
                .HasForeignKey(giu => giu.GroupId)
                .OnDelete(DeleteBehavior.Cascade); // ✅ Xóa nhóm cũng xóa liên kết người dùng

            modelBuilder.Entity<GroupItemTask>()
                .HasOne(git => git.Group)
                .WithMany()
                .HasForeignKey(git => git.GroupId)
                .OnDelete(DeleteBehavior.Cascade); // ✅ Xóa nhóm cũng xóa liên kết nhiệm vụ

            modelBuilder.Entity<WorkProgress>().HasData(
                new WorkProgress { Id = 1, Status = "Đang chờ" },
                new WorkProgress { Id = 2, Status = "Đang thực hiện" },
                new WorkProgress { Id = 3, Status = "Đã hoàn thành" },
                new WorkProgress { Id = 4, Status = "Đang review" },
                new WorkProgress { Id = 5, Status = "Đã duyệt" },
                new WorkProgress { Id = 6, Status = "Tạm dừng" },
                new WorkProgress { Id = 7, Status = "Trễ hạn" },
                new WorkProgress { Id = 8, Status = "Đã hủy nhiệm vụ" }
    );

        }

    }

}
