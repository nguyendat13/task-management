namespace taskmanager.DTOs.Notifications
{
    public class TaskProgressNotificationDTO
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public string Status { get; set; }
    }
}
