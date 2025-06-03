namespace taskmanager.DTOs.Group
{
    public class GroupItemTaskDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int TaskId { get; set; }
        public string TaskTitle { get; set; }
        public DateTime AssignedAt { get; set; }
    }
}
