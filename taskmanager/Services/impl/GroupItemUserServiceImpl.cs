using taskmanager.Data;
using taskmanager.DTOs.Group;
using taskmanager.Models;
using Microsoft.EntityFrameworkCore;

namespace taskmanager.Services.impl
{
    public class GroupItemUserServiceImpl : IGroupItemUserService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notificationService;

        public GroupItemUserServiceImpl(AppDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;

        }

        public async Task<GroupItemUserDTO> JoinGroupAsync(JoinGroupByCodeDTO dto)
        {
            // Tìm nhóm bằng GroupCode
            var group = await _context.Groups.FirstOrDefaultAsync(g => g.GroupCode == dto.GroupCode);
            if (group == null)
                throw new Exception("Không tìm thấy nhóm với mã này.");

            // Kiểm tra xem user đã tham gia chưa
            var exists = await _context.GroupItemUsers
                .AnyAsync(g => g.GroupId == group.Id && g.UserId == dto.UserId);
            if (exists)
                throw new Exception("Người dùng đã tham gia nhóm này.");

            // Tạo bản ghi mới
            var entry = new GroupItemUser
            {
                GroupId = group.Id,
                UserId = dto.UserId,
                IsLeader = dto.IsLeader,
                JoinedAt = DateTime.UtcNow
            };

            _context.GroupItemUsers.Add(entry);
            await _context.SaveChangesAsync();

            // Lấy thông tin người dùng
            var user = await _context.Users.FindAsync(dto.UserId);

            return new GroupItemUserDTO
            {
                Id = entry.Id,
                GroupId = group.Id,
                GroupName = group.Name,
                UserId = dto.UserId,
                UserName = user?.Name ?? "",
                IsLeader = entry.IsLeader,
                JoinedAt = entry.JoinedAt
            };
        }

        public async Task<bool> LeaveGroupAsync(int groupId, int userId)
        {
            var item = await _context.GroupItemUsers
                .FirstOrDefaultAsync(g => g.GroupId == groupId && g.UserId == userId);
            if (item == null) return false;

            _context.GroupItemUsers.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<GroupItemUserDTO>> GetUsersByGroupIdAsync(int groupId)
        {
            return await _context.GroupItemUsers
                .Where(g => g.GroupId == groupId)
                .Include(g => g.User)
                .Include(g => g.Group)
                .Select(g => new GroupItemUserDTO
                {
                    Id = g.Id,
                    GroupId = g.GroupId,
                    GroupName = g.Group.Name,
                    UserId = g.UserId,
                    UserName = g.User.Name,
                    IsLeader = g.IsLeader,
                    JoinedAt = g.JoinedAt
                }).ToListAsync();
        }
        public async Task<GroupItemUserDTO> AddMemberByEmailOrUsernameAsync(AddMemberToGroupDTO dto)
        {
            var group = await _context.Groups.FindAsync(dto.GroupId);
            if (group == null)
                throw new Exception("Không tìm thấy nhóm.");

            // Tìm user theo email hoặc username
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.EmailOrUsername || u.Username == dto.EmailOrUsername);

            if (user == null)
                throw new Exception("Không tìm thấy người dùng.");

            // Kiểm tra xem user đã ở trong nhóm chưa
            bool isInGroup = await _context.GroupItemUsers
                .AnyAsync(g => g.GroupId == dto.GroupId && g.UserId == user.Id);

            if (isInGroup)
                throw new Exception("Người dùng đã ở trong nhóm.");

            // Tạo bản ghi
            var entry = new GroupItemUser
            {
                GroupId = group.Id,
                UserId = user.Id,
                IsLeader = false,
                JoinedAt = DateTime.UtcNow
            };

            //_context.GroupItemUsers.Add(entry);
            //await _context.SaveChangesAsync();

            // ✅ Gửi thông báo mời vào nhóm
            await _notificationService.SendGroupInviteNotificationAsync(user.Id, group.Id);

            return new GroupItemUserDTO
            {
                Id = entry.Id,
                GroupId = group.Id,
                GroupName = group.Name,
                UserId = user.Id,
                UserName = user.Username,
                IsLeader = false,
                JoinedAt = entry.JoinedAt
            };
        }


        public async Task<bool> RemoveMemberAsync(int groupId, int userId)
        {
            var item = await _context.GroupItemUsers
                .FirstOrDefaultAsync(g => g.GroupId == groupId && g.UserId == userId);
            if (item == null) return false;

            _context.GroupItemUsers.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task AssignLeaderAsync(int groupId, int newLeaderId)
        {
            var members = await _context.GroupItemUsers
                .Where(g => g.GroupId == groupId)
                .ToListAsync();

            var newLeader = members.FirstOrDefault(m => m.UserId == newLeaderId);
            if (newLeader == null)
                throw new Exception("Không tìm thấy thành viên để ủy quyền.");

            foreach (var member in members)
            {
                member.IsLeader = member.UserId == newLeaderId;
            }

            await _context.SaveChangesAsync();
        }

    }

}
