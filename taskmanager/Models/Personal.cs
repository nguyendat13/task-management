using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("personal")]
    public class Personal
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("TaskItem")]
        public int TaskId { get; set; }
        public TaskItem TaskItem { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}
