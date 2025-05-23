namespace taskmanager.DTOs.Task
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Detail { get; set; }
        public DateTime? DueDate { get; set; }

        public int UserId { get; set; }
        public int? GroupId { get; set; }
        public int? WorkProgressId { get; set; }
    }
}
