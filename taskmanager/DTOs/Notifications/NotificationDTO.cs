
using taskmanager.Models;

namespace taskmanager.DTOs.Notifications
{
    public class NotificationDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }  // ← Tên người dùng
        public int? TaskId { get; set; }
        public string? TaskTitle { get; set; } // ← Tên công việc
        public int? MessageId { get; set; }
        public string Message { get; set; }
        public bool WasRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public NotificationType Type { get; set; }
        public NotificationStatus Status { get; set; }

    }
}
