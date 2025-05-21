using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("groups")]
    public class Group
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("TaskItem")]
        public int? TaskId { get; set; }
        public TaskItem? TaskItem { get; set; }

        public string? Duty { get; set; }

        public string? Name { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<TaskItem> Tasks { get; set; }
    }
}
