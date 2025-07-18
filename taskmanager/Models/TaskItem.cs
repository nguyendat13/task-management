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

        public string? Description { get; set; }

        public string? Detail { get; set; }

        public DateTime? DueDate { get; set; }


        public string? AttachmentPath { get; set; }
        public string? SubmissionFilePath { get; set; }

        public string? AttachmentOriginalName { get; set; }
        public string? SubmissionOriginalName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public int? GroupId { get; set; }
        public Group? Group { get; set; }

        [ForeignKey("WorkProgress")]
        public int? WorkProgressId { get; set; }
        public WorkProgress? WorkProgress { get; set; }
        public ICollection<TaskAssignee> Assignees { get; set; }

        public ICollection<Message> Messages { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
