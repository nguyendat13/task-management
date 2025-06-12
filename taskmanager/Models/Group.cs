using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("groups")]
    public class Group
    {
        [Key]
        public int Id { get; set; }

        public string? Duty { get; set; }

        public string? Name { get; set; }
        public string GroupCode { get; set; } = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<TaskItem> Tasks { get; set; }
    }
}
