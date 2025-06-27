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
                    Status = n.Status,
                     RequestUserId = n.RequestUserId,
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

        public async Task<GroupItemUserDTO?> AcceptNotificationAsync(int notificationId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.Status == NotificationStatus.Pending);

            if (notification == null)
                throw new Exception("Thông báo không hợp lệ hoặc đã xử lý.");

            int groupId = notification.GroupId ?? throw new Exception("Thiếu GroupId.");

            // Trường hợp: là người nhận lời mời từ trưởng nhóm
            if (notification.Type == NotificationType.InviteToGroup)
            {
                int userId = notification.UserId ?? throw new Exception("Thiếu UserId.");

                bool alreadyInGroup = await _context.GroupItemUsers
                    .AnyAsync(g => g.GroupId == groupId && g.UserId == userId);
                if (alreadyInGroup)
                    throw new Exception("Bạn đã ở trong nhóm.");

                var entry = new GroupItemUser
                {
                    GroupId = groupId,
                    UserId = userId,
                    IsLeader = false,
                    JoinedAt = DateTime.UtcNow
                };

                _context.GroupItemUsers.Add(entry);
                notification.Status = NotificationStatus.Accepted;
                notification.WasRead = true;
                notification.UpdatedAt = DateTime.UtcNow;

                // ✅ Gửi phản hồi lại cho trưởng nhóm
                var leaderId = await _context.GroupItemUsers
                    .Where(g => g.GroupId == groupId && g.IsLeader)
                    .Select(g => g.UserId)
                    .FirstOrDefaultAsync();

                if (leaderId != 0)
                {
                    var groupInfo = await _context.Groups.FindAsync(groupId);
                    var userInfo = await _context.Users.FindAsync(userId);

                    var notifyLeader = new Notification
                    {
                        UserId = leaderId,
                        GroupId = groupId,
                        Message = $"Người dùng '{userInfo?.Username}' đã chấp nhận lời mời tham gia nhóm '{groupInfo?.Name}'.",
                        Type = NotificationType.Message,
                        Status = NotificationStatus.Accepted,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };

                    _context.Notifications.Add(notifyLeader);
                }

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

            // Trường hợp: trưởng nhóm đồng ý cho người khác tham gia
            if (notification.Type == NotificationType.Message && notification.RequestUserId != null)
            {
                int requestUserId = notification.RequestUserId.Value;

                bool alreadyInGroup = await _context.GroupItemUsers
                    .AnyAsync(g => g.GroupId == groupId && g.UserId == requestUserId);
                if (alreadyInGroup)
                    throw new Exception("Người này đã ở trong nhóm.");

                var entry = new GroupItemUser
                {
                    GroupId = groupId,
                    UserId = requestUserId,
                    IsLeader = false,
                    JoinedAt = DateTime.UtcNow
                };

                _context.GroupItemUsers.Add(entry);
                notification.Status = NotificationStatus.Accepted;
                notification.WasRead = true;
                notification.UpdatedAt = DateTime.UtcNow;
                if (notification.RequestUserId.HasValue)
                {
                    var groupInfo = await _context.Groups.FindAsync(groupId); // 🔄 đổi tên biến
                    var responseNotify = new Notification
                    {
                        UserId = notification.RequestUserId.Value,
                        GroupId = groupId,
                        Message = $"Yêu cầu tham gia nhóm '{groupInfo?.Name}' của bạn đã được chấp nhận.",
                        Type = NotificationType.Message,
                        Status = NotificationStatus.Accepted,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    _context.Notifications.Add(responseNotify);
                }

                await _context.SaveChangesAsync();

                var group = await _context.Groups.FindAsync(groupId);
                var user = await _context.Users.FindAsync(requestUserId);

                return new GroupItemUserDTO
                {
                    Id = entry.Id,
                    GroupId = groupId,
                    GroupName = group?.Name,
                    UserId = requestUserId,
                    UserName = user?.Username,
                    IsLeader = false,
                    JoinedAt = entry.JoinedAt
                };
            }

            throw new Exception("Không hỗ trợ loại thông báo này.");
        }

        public async Task RejectNotificationAsync(int notificationId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.Status == NotificationStatus.Pending);

            if (notification == null)
                throw new Exception("Thông báo không hợp lệ hoặc đã xử lý.");

            int groupId = notification.GroupId ?? throw new Exception("Thiếu GroupId.");

            notification.Status = NotificationStatus.Rejected;
            notification.WasRead = true;
            notification.UpdatedAt = DateTime.UtcNow;

            // ✅ Trường hợp: người dùng từ chối lời mời tham gia nhóm
            if (notification.Type == NotificationType.InviteToGroup && notification.UserId.HasValue)
            {
                int userId = notification.UserId.Value;

                // Tìm trưởng nhóm để gửi phản hồi
                var leaderId = await _context.GroupItemUsers
                    .Where(g => g.GroupId == groupId && g.IsLeader)
                    .Select(g => g.UserId)
                    .FirstOrDefaultAsync();

                if (leaderId != 0)
                {
                    var group = await _context.Groups.FindAsync(groupId);
                    var user = await _context.Users.FindAsync(userId);

                    var notifyLeader = new Notification
                    {
                        UserId = leaderId,
                        GroupId = groupId,
                        Message = $"Người dùng '{user?.Username}' đã từ chối lời mời tham gia nhóm '{group?.Name}'.",
                        Type = NotificationType.Message,
                        Status = NotificationStatus.Rejected,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };

                    _context.Notifications.Add(notifyLeader);
                }
            }

            // ✅ Trường hợp: trưởng nhóm từ chối yêu cầu tham gia nhóm
            else if (notification.Type == NotificationType.Message && notification.RequestUserId.HasValue)
            {
                var group = await _context.Groups.FindAsync(groupId);

                var notifyRequester = new Notification
                {
                    UserId = notification.RequestUserId.Value,
                    GroupId = groupId,
                    Message = $"Yêu cầu tham gia nhóm '{group?.Name}' của bạn đã bị từ chối.",
                    Type = NotificationType.Message,
                    Status = NotificationStatus.Rejected,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Notifications.Add(notifyRequester);
            }

            await _context.SaveChangesAsync();
        }

        public async Task SendNotificationAsync(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }
        public async Task SendJoinGroupRequestNotificationAsync(int leaderUserId, int groupId, int requestUserId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            var user = await _context.Users.FindAsync(requestUserId);

            var notification = new Notification
            {
                UserId = leaderUserId, // người nhận là trưởng nhóm
                GroupId = groupId,
                RequestUserId = requestUserId,
                Message = $"Người dùng {user?.Name} đã yêu cầu tham gia nhóm '{group?.Name}'.",
                Type = NotificationType.Message, // Hoặc tạo thêm NotificationType.JoinRequest nếu bạn muốn
                Status = NotificationStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

    }
}