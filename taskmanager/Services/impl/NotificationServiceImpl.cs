using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.Group;
using taskmanager.DTOs.Notifications;
using taskmanager.Models;

namespace taskmanager.Services.Implementations
{
    public class NotificationServiceImpl : INotificationService
    {
        private readonly AppDbContext _context;
        public NotificationServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendTaskAssignedNotificationToGroupAsync(int taskId, int groupId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            var groupMembers = await _context.GroupItemUsers
                .Where(g => g.GroupId == groupId)
                .Include(g => g.User)
                .ToListAsync();

            foreach (var member in groupMembers)
            {
                var notification = new Notification
                {
                    UserId = member.UserId,
                    TaskId = taskId,
                    Message = $"Bạn được giao nhiệm vụ '{task?.Title}' trong nhóm.",
                    Type = NotificationType.TaskAssigned,
                    Status = NotificationStatus.None,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Notifications.Add(notification);
            }
            await _context.SaveChangesAsync();
        }

        public async Task SendGroupInviteNotificationAsync(int userId, int groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            var notification = new Notification
            {
                UserId = userId,
                GroupId = groupId,
                Message = $"Bạn đã được mời tham gia nhóm '{group?.Name}'. Hãy xác nhận.",
                Type = NotificationType.InviteToGroup,
                Status = NotificationStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<List<NotificationDTO>> GetUserNotificationsAsync(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDTO
                {
                    Id = n.Id,
                    UserId = n.UserId,
                    TaskId = n.TaskId,
                    MessageId = n.MessageId,
                    Message = n.Message,
                    WasRead = n.WasRead,
                    CreatedAt = n.CreatedAt,
                    UpdatedAt = n.UpdatedAt,
                    Type = n.Type,
                    Status = n.Status
                })
                .ToListAsync();
        }

        public async Task MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.WasRead = true;
                notification.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<GroupItemUserDTO> AcceptGroupInvitationAsync(int notificationId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.Type == NotificationType.InviteToGroup);

            if (notification == null)
                throw new Exception("Không tìm thấy lời mời.");

            int userId = notification.UserId ?? throw new Exception("Notification không có UserId.");
            int groupId = notification.GroupId ?? throw new Exception("Notification không có GroupId.");

            // Kiểm tra đã ở trong nhóm chưa
            bool alreadyInGroup = await _context.GroupItemUsers
                .AnyAsync(g => g.GroupId == groupId && g.UserId == userId);
            if (alreadyInGroup)
                throw new Exception("Bạn đã là thành viên nhóm này.");

            // Thêm vào nhóm
            var entry = new GroupItemUser
            {
                GroupId = groupId,
                UserId = userId,
                IsLeader = false,
                JoinedAt = DateTime.UtcNow
            };

            _context.GroupItemUsers.Add(entry);

            // Cập nhật trạng thái lời mời
            notification.Status = NotificationStatus.Accepted;
            notification.WasRead = true;
            notification.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var group = await _context.Groups.FindAsync(groupId);
            var user = await _context.Users.FindAsync(userId);

            return new GroupItemUserDTO
            {
                Id = entry.Id,
                GroupId = groupId,
                GroupName = group?.Name,
                UserId = userId,
                UserName = user?.Username,
                IsLeader = false,
                JoinedAt = entry.JoinedAt
            };
        }


        public async Task RejectGroupInvitationAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null || notification.Status != NotificationStatus.Pending)
                throw new Exception("Lời mời không tồn tại hoặc đã được xử lý.");

            notification.Status = NotificationStatus.Rejected;
            notification.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }
    }
}