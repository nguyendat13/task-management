using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace taskmanager.Models
{
    [Table("tasks")]
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public int? Priority { get; set; }

        public string? Description { get; set; }

        public string? Detail { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("WorkProgress")]
        public int? WorkProgressId { get; set; }
        public WorkProgress? WorkProgress { get; set; }

        public ICollection<Message> Messages { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}
