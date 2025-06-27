using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("notifications")]
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public User? User { get; set; }

        [ForeignKey("TaskItem")]
        public int? TaskId { get; set; }
        public TaskItem? TaskItem { get; set; }
        public int? GroupId { get; set; }
        public Group? Group { get; set; }

        [ForeignKey("Message")]
        public int? MessageId { get; set; }
        public Message? RelatedMessage { get; set; } 

        [Required]
        public string Message { get; set; }

        public bool WasRead { get; set; } = false;
        public int? RequestUserId { get; set; }
        public User? RequestUser { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public NotificationType Type { get; set; } = NotificationType.Other;
        public NotificationStatus Status { get; set; } = NotificationStatus.None;

    }
}
