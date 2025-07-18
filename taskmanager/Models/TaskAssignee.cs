using System.ComponentModel.DataAnnotations.Schema;

namespace taskmanager.Models
{
    [Table("taskassignee")]

    public class TaskAssignee
    {
        public int Id { get; set; }

        public int TaskId { get; set; }
        public TaskItem TaskItem { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
