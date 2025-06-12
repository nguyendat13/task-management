namespace taskmanager.DTOs.Group
{
    public class GroupItemTaskDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int TaskId { get; set; }
        public string TaskTitle { get; set; }
        public DateTime? DueDate { get; set; }
        public int? WorkProgressId { get; set; }

        public DateTime AssignedAt { get; set; }
    }
}
