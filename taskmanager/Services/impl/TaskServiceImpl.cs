using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.Task;
using taskmanager.Models;

namespace taskmanager.Services
{
    public class TaskServiceImpl : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskServiceImpl(AppDbContext context)
        {
            _context = context;
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
                WorkProgressId = task.WorkProgressId
            };
        }

        public async Task<IEnumerable<TaskDTO>> GetTasksByUserIdAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
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


        public async Task<TaskDTO> CreateTaskAsync(CreateTaskDTO dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Detail = dto.Detail,
                DueDate = dto.DueDate,
                UserId = dto.UserId,
                GroupId = dto.GroupId,
                WorkProgressId = dto.WorkProgressId ?? 1,// Mặc định “Chưa bắt đầu”
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

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

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Detail = dto.Detail;
            task.DueDate = dto.DueDate;
            task.UserId = dto.UserId;
            task.GroupId = dto.GroupId;
            task.WorkProgressId = dto.WorkProgressId;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
