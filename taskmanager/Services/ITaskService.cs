using taskmanager.DTOs.Task;
using taskmanager.Models;

namespace taskmanager.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTO>> GetPersonalTasksAsync(int userId);

        Task<IEnumerable<TaskDTO>> GetAllTasksAsync();
        Task<TaskDTO?> GetTaskByIdAsync(int id);
        Task<IEnumerable<TaskDTO>> GetTasksByUserIdAsync(int userId);
        Task<TaskDTO> CreateTaskAsync(CreateTaskDTO dto);
        Task<bool> UpdateTaskAsync(int id, CreateTaskDTO dto);
        Task<bool> DeleteTaskAsync(int id);

        Task<string?> GetAttachmentPathAsync(int taskId);
        Task<string?> GetSubmissionFilePathAsync(int taskId);

    }
}
    