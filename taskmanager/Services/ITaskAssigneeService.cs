using taskmanager.DTOs.TaskAssignee;
using taskmanager.Models;

namespace taskmanager.Services
{
    public interface ITaskAssigneeService
    {
        Task<IEnumerable<TaskAssigneeDTO>> GetAllAsync();
        Task<TaskAssigneeDTO> GetByIdAsync(int id);
        Task<IEnumerable<TaskAssigneeDTO>> GetByTaskIdAsync(int taskId);

    }
}
