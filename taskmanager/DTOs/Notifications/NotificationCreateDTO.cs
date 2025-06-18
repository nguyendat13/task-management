namespace taskmanager.DTOs.Notifications
{
    public class NotificationCreateDTO
    {
        public int UserId { get; set; }
        public string Content { get; set; }
        public bool WasRead { get; set; } = false;
    }
}
