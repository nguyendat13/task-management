using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.TaskAssignee;
using taskmanager.Models;
using taskmanager.Services;

public class TaskAssigneeServiceImpl : ITaskAssigneeService
{
    private readonly AppDbContext _context;

    public TaskAssigneeServiceImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskAssigneeDTO>> GetAllAsync()
    {
        return await _context.TaskAssignees
            .Include(t => t.User)
            .Select(t => new TaskAssigneeDTO
            {
                Id = t.Id,
                Name = t.User.Name
            })
            .ToListAsync();
    }

    public async Task<TaskAssigneeDTO> GetByIdAsync(int id)
    {
        var entity = await _context.TaskAssignees
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (entity == null) return null;

        return new TaskAssigneeDTO
        {
            Id = entity.Id,
            Name = entity.User.Name
        };
    }
    public async Task<IEnumerable<TaskAssigneeDTO>> GetByTaskIdAsync(int taskId)
    {
        return await _context.TaskAssignees
            .Where(ta => ta.TaskId == taskId)
            .Include(ta => ta.User)
            .Select(ta => new TaskAssigneeDTO
            {
                Id = ta.Id,
                UserId = ta.User.Id,
                Name = ta.User.Name // hoặc ta.User.Username nếu bạn không có FullName
            })
            .ToListAsync();
    }
}
