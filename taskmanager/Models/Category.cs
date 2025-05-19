using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("categories")]
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("Group")]
        public int? GroupId { get; set; }
        public Group? Group { get; set; }

        [ForeignKey("Personal")]
        public int? PersonalId { get; set; }
        public Personal? Personal { get; set; }
    }
}
