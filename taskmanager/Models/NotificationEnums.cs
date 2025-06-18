namespace taskmanager.Models
{
   
        public enum NotificationType
        {
            InviteToGroup,
            TaskAssigned,
            Message,
            Other
        }

        public enum NotificationStatus
        {
            Pending,
            Accepted,
            Rejected,
            None // Với các loại thông báo không cần phản hồi
        }
}
