using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.Group;
using taskmanager.Models;

namespace taskmanager.Services
{
    public class GroupServiceImpl : IGroupService
    {
        private readonly AppDbContext _context;

        public GroupServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GroupDTO>> GetAllGroupsAsync()
        {
            return await _context.Groups
                .Include(g => g.Tasks)
                .Select(g => new GroupDTO
                {
                    Id = g.Id,
                    Duty = g.Duty,
                    Name = g.Name,
                    GroupCode = g.GroupCode,
                    CreatedAt = g.CreatedAt,
                    UpdatedAt = g.UpdatedAt,
                    TaskTitles = g.Tasks.Select(t => t.Title).ToList()
                }).ToListAsync();
        }

        public async Task<GroupDTO?> GetGroupByIdAsync(int id)
        {
            var group = await _context.Groups
                .Include(g => g.Tasks)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null) return null;

            return new GroupDTO
            {
                Id = group.Id,
                Duty = group.Duty,
                Name = group.Name,
                GroupCode=group.GroupCode,
                CreatedAt = group.CreatedAt,
                UpdatedAt = group.UpdatedAt,
                TaskTitles = group.Tasks.Select(t => t.Title).ToList()
            };
        }
        public async Task<List<GroupDTO>> GetGroupsByUserIdAsync(int userId)
        {
            return await _context.GroupItemUsers
                .Where(giu => giu.UserId == userId)
                .Include(giu => giu.Group)
                    .ThenInclude(g => g.Tasks)
                .Select(giu => new GroupDTO
                {
                    Id = giu.Group.Id,
                    Duty = giu.Group.Duty,
                    Name = giu.Group.Name,
                    GroupCode=giu.Group.GroupCode,
                    CreatedAt = giu.Group.CreatedAt,
                    UpdatedAt = giu.Group.UpdatedAt,
                    TaskTitles = giu.Group.Tasks.Select(t => t.Title).ToList()
                }).ToListAsync();
        }

        public async Task<GroupDTO> CreateGroupAsync(GroupCreateDTO groupCreateDto)
        {
            var group = new Group
            {
                Duty = groupCreateDto.Duty,
                Name = groupCreateDto.Name,
                GroupCode = GenerateUniqueGroupCode(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            // ✅ Gán user vào group sau khi tạo
            var groupItemUser = new GroupItemUser
            {
                GroupId = group.Id,
                UserId = groupCreateDto.UserId,
                IsLeader = true
            };

            _context.GroupItemUsers.Add(groupItemUser);
            await _context.SaveChangesAsync();

            return new GroupDTO
            {
                Id = group.Id,
                Duty = group.Duty,
                Name = group.Name,
                GroupCode = group.GroupCode,
                CreatedAt = group.CreatedAt,
                UpdatedAt = group.UpdatedAt,
                TaskTitles = new List<string>()
            };
        }

        private string GenerateUniqueGroupCode()
        {
            string code;
            do
            {
                code = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
            } while (_context.Groups.Any(g => g.GroupCode == code));
            return code;
        }
        public async Task<bool> UpdateGroupAsync(int id, GroupUpdateDTO groupUpdateDto)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null)
                return false;

            group.Duty = groupUpdateDto.Duty;
            group.Name = groupUpdateDto.Name;
            group.UpdatedAt = DateTime.UtcNow;

            _context.Groups.Update(group);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<bool> DeleteGroupAsync(int groupId, int userId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null) return false;

            // Kiểm tra user có phải trưởng nhóm không
            var isLeader = await _context.GroupItemUsers
                .AnyAsync(g => g.GroupId == groupId && g.UserId == userId && g.IsLeader);

            if (!isLeader)
                throw new UnauthorizedAccessException("Chỉ trưởng nhóm mới có quyền xóa nhóm.");

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
