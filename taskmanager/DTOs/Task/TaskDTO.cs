namespace taskmanager.DTOs.Task
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Detail { get; set; }
        public DateTime? DueDate { get; set; }
        public string? AttachmentPath { get; set; }
        public string? SubmissionFilePath { get; set; }
        public string? AttachmentOriginalName { get; set; }
        public string? SubmissionOriginalName { get; set; }

        public int UserId { get; set; }
        public int? GroupId { get; set; }
        public int? WorkProgressId { get; set; }
        public List<int> AllowedProgressIds { get; set; } = new(); // thêm dòng này
        public List<int> AssigneeIds { get; set; } = new();
    }
}
