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
                CreatedAt = group.CreatedAt,
                UpdatedAt = group.UpdatedAt,
                TaskTitles = group.Tasks.Select(t => t.Title).ToList()
            };
        }

        public async Task<GroupDTO> CreateGroupAsync(GroupCreateDTO groupCreateDto)
        {
            var group = new Group
            {
                Duty = groupCreateDto.Duty,
                Name = groupCreateDto.Name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return new GroupDTO
            {
                Id = group.Id,
                Duty = group.Duty,
                Name = group.Name,
                CreatedAt = group.CreatedAt,
                UpdatedAt = group.UpdatedAt,
                TaskTitles = new List<string>()
            };
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


        public async Task<bool> DeleteGroupAsync(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null) return false;

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
