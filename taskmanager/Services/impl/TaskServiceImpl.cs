using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.Group;
using taskmanager.DTOs.Task;
using taskmanager.Models;

namespace taskmanager.Services
{
    public class TaskServiceImpl : ITaskService
    {
        private readonly AppDbContext _context;
        private static readonly List<int> AllowedProgressIds = new() { 1, 2, 3, 4, 5, 6, 7, 8 };

        public TaskServiceImpl(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TaskDTO>> GetPersonalTasksAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId && t.GroupId == null)
                .Select(t => new TaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Detail = t.Detail,
                    DueDate = t.DueDate,
                    UserId = t.UserId,
                    GroupId = t.GroupId,
                    WorkProgressId = t.WorkProgressId
                }).ToListAsync();
        }

        public async Task<IEnumerable<TaskDTO>> GetAllTasksAsync()
        {
            return await _context.Tasks.Select(t => new TaskDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Detail = t.Detail,
                DueDate = t.DueDate,
                UserId = t.UserId,
                GroupId = t.GroupId,
                WorkProgressId = t.WorkProgressId
            }).ToListAsync();
        }

        public async Task<TaskDTO?> GetTaskByIdAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            return new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Detail = task.Detail,
                DueDate = task.DueDate,
                UserId = task.UserId,
                GroupId = task.GroupId,
                WorkProgressId = task.WorkProgressId,
                AllowedProgressIds = AllowedProgressIds

            };
        }

        public async Task<IEnumerable<TaskDTO>> GetTasksByUserIdAsync(int userId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();

            var result = tasks.Select(t => new TaskDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                WorkProgressId = t.WorkProgressId,
                UserId = t.UserId,
                GroupId = t.GroupId,
                AllowedProgressIds = AllowedProgressIds

            });

            return result;
        }

      
        public async Task<TaskDTO> CreateTaskAsync(CreateTaskDTO dto)
        {
            // Nếu có GroupId, kiểm tra xem User có thuộc group đó không
            if (dto.GroupId != null)
            {
                bool isMember = await _context.GroupItemUsers
                    .AnyAsync(giu => giu.GroupId == dto.GroupId && giu.UserId == dto.UserId);

                if (!isMember)
                    throw new Exception("User is not a member of the specified group.");
            }

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Detail = dto.Detail,
                DueDate = dto.DueDate,
                UserId = dto.UserId,
                GroupId = dto.GroupId,
                WorkProgressId = dto.WorkProgressId ?? 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Nếu là personal task (GroupId == null) → lưu Personal
            if (task.GroupId == null)
            {
                var personal = new Personal
                {
                    Name = "Personal Task",
                    TaskId = task.Id,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Personals.Add(personal);
                await _context.SaveChangesAsync();
            }
            else
            {
                // Nếu là task trong group, lưu vào bảng trung gian group_item_task
                var groupItemTask = new GroupItemTask
                {
                    GroupId = task.GroupId.Value,
                    TaskId = task.Id,
                    AssignedAt = DateTime.UtcNow
                };
                _context.GroupItemTasks.Add(groupItemTask);
                await _context.SaveChangesAsync();
            }

            return new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Detail = task.Detail,
                DueDate = task.DueDate,
                UserId = task.UserId,
                GroupId = task.GroupId,
                WorkProgressId = task.WorkProgressId
            };
        }


        public async Task<bool> UpdateTaskAsync(int id, CreateTaskDTO dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            // Nếu là task nhóm, kiểm tra xem user có trong nhóm và có phải nhóm trưởng không
            bool isLeader = false;
            if (task.GroupId.HasValue)
            {
                isLeader = await IsUserLeaderAsync(task.GroupId.Value, dto.UserId);
            }

            // Nếu là thành viên không phải nhóm trưởng → chỉ cho sửa tiến độ
            if (!isLeader && task.GroupId.HasValue)
            {
                task.WorkProgressId = dto.WorkProgressId ?? task.WorkProgressId;
                task.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return true;
            }

            // Nếu là nhóm trưởng hoặc task cá nhân thì được sửa toàn bộ
            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Detail = dto.Detail;
            task.DueDate = dto.DueDate;
            task.UserId = dto.UserId;
            task.GroupId = dto.GroupId;
            task.WorkProgressId = dto.WorkProgressId ?? task.WorkProgressId;
            task.UpdatedAt = DateTime.UtcNow;

            var existingLink = await _context.GroupItemTasks.FirstOrDefaultAsync(g => g.TaskId == id);

            if (dto.GroupId.HasValue)
            {
                if (existingLink == null)
                {
                    var groupItemTask = new GroupItemTask
                    {
                        GroupId = dto.GroupId.Value,
                        TaskId = id,
                        AssignedAt = DateTime.UtcNow
                    };
                    _context.GroupItemTasks.Add(groupItemTask);

                    var personal = await _context.Personals.FirstOrDefaultAsync(p => p.TaskId == id);
                    if (personal != null)
                        _context.Personals.Remove(personal);
                }
                else if (existingLink.GroupId != dto.GroupId.Value)
                {
                    existingLink.GroupId = dto.GroupId.Value;
                    existingLink.AssignedAt = DateTime.UtcNow;
                    _context.GroupItemTasks.Update(existingLink);
                }
            }
            else
            {
                if (existingLink != null)
                    _context.GroupItemTasks.Remove(existingLink);

                var personal = await _context.Personals.FirstOrDefaultAsync(p => p.TaskId == id);
                if (personal == null)
                {
                    var newPersonal = new Personal
                    {
                        Name = "Personal Task",
                        TaskId = id,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    _context.Personals.Add(newPersonal);
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<bool> IsUserLeaderAsync(int groupId, int userId)
        {
            var member = await _context.GroupItemUsers
                .FirstOrDefaultAsync(m => m.GroupId == groupId && m.UserId == userId);
            return member?.IsLeader == true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            // Xóa liên kết trong GroupItemTask nếu có
            var groupLinks = _context.GroupItemTasks.Where(g => g.TaskId == id);
            if (groupLinks.Any())
            {
                _context.GroupItemTasks.RemoveRange(groupLinks);
            }

            // Xóa liên kết trong Personal nếu có
            var personal = await _context.Personals.FirstOrDefaultAsync(p => p.TaskId == id);
            if (personal != null)
            {
                _context.Personals.Remove(personal);
            }

            // Xóa task
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
