using taskmanager.DTOs.Group;
using taskmanager.DTOs.Notifications;
using taskmanager.Models;

namespace taskmanager.Services
{
    public interface INotificationService
    {
        Task SendTaskAssignedNotificationToGroupAsync(int taskId, int groupId);
        Task SendGroupInviteNotificationAsync(int userId, int groupId);
        Task<List<NotificationDTO>> GetUserNotificationsAsync(int userId);
        Task MarkAsReadAsync(int notificationId);
        Task<GroupItemUserDTO?> AcceptNotificationAsync(int notificationId);

        Task RejectNotificationAsync(int notificationId);
        Task SendNotificationAsync(Notification notification);
        Task SendJoinGroupRequestNotificationAsync(int leaderUserId, int groupId, int requestUserId);
    }
}
