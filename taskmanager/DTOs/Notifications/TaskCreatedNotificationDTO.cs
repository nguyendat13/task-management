namespace taskmanager.DTOs.Notifications
{
    public class TaskCreatedNotificationDTO
    {
        public int GroupId { get; set; }
        public int TaskId { get; set; }
        public string TaskTitle { get; set; } = string.Empty;
        public int CreatorUserId { get; set; }
    }
}
