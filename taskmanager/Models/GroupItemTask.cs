using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("group_item_task")]
    public class GroupItemTask
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }

        [ForeignKey("TaskItem")]
        public int TaskId { get; set; }
        public TaskItem TaskItem { get; set; }

        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    }
}
