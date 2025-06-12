using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using taskmanager.Data;
using taskmanager.DTOs;
using taskmanager.DTOs.Group;
using taskmanager.Models;
using taskmanager.Services;

public class GroupItemTaskServiceImpl : IGroupItemTaskService
{
    private readonly AppDbContext _context;

    public GroupItemTaskServiceImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<GroupItemTaskDTO>> GetAllAsync()
    {
        return await _context.GroupItemTasks
            .Include(git => git.Group)
            .Include(git => git.TaskItem)
            .Select(git => new GroupItemTaskDTO
            {
                Id = git.Id,
                GroupId = git.GroupId,
                GroupName = git.Group.Name,
                TaskId = git.TaskId,
                TaskTitle = git.TaskItem.Title,
                AssignedAt = git.AssignedAt
            }).ToListAsync();
    }
    public async Task<IEnumerable<GroupItemTaskDTO>> GetByGroupIdAsync(int groupId)
    {
        return await _context.GroupItemTasks
            .Where(git => git.GroupId == groupId)
            .Include(git => git.Group)
            .Include(git => git.TaskItem)
            .Select(git => new GroupItemTaskDTO
            {
                Id = git.Id,
                GroupId = git.GroupId,
                GroupName = git.Group.Name,
                TaskId = git.TaskId,
                TaskTitle = git.TaskItem.Title,
                DueDate=git.TaskItem.DueDate,
                WorkProgressId=git.TaskItem.WorkProgressId,
                AssignedAt = git.AssignedAt
            }).ToListAsync();
    }

    public async Task<IEnumerable<GroupItemTaskDTO>> GetByUserIdAsync(int userId)
    {
        return await _context.GroupItemTasks
            .Include(git => git.Group)
            .Include(git => git.TaskItem)
            .Where(git => git.TaskItem.UserId == userId)
            .Select(git => new GroupItemTaskDTO
            {
                Id = git.Id,
                GroupId = git.GroupId,
                GroupName = git.Group.Name,
                TaskId = git.TaskId,
                TaskTitle = git.TaskItem.Title,
                AssignedAt = git.AssignedAt
            }).ToListAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var groupItemTask = await _context.GroupItemTasks.FindAsync(id);
        if (groupItemTask == null) return false;

        // Xóa TaskItem liên quan
        var task = await _context.Tasks.FindAsync(groupItemTask.TaskId);
        if (task != null)
        {
            _context.Tasks.Remove(task);
        }

        // Xóa GroupItemTask
        _context.GroupItemTasks.Remove(groupItemTask);

        await _context.SaveChangesAsync();
        return true;
    }
}
