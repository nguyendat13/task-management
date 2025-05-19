using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("work_progress")]
    public class WorkProgress
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Status { get; set; }

        public ICollection<TaskItem> Tasks { get; set; }
    }
}
