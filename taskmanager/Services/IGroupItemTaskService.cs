using taskmanager.DTOs.Group    ;


namespace taskmanager.Services
{
    public interface IGroupItemTaskService
    {
        Task<IEnumerable<GroupItemTaskDTO>> GetAllAsync();
        Task<IEnumerable<GroupItemTaskDTO>> GetByGroupIdAsync(int groupId);
        Task<IEnumerable<GroupItemTaskDTO>> GetByUserIdAsync(int userId);

        Task<bool> DeleteAsync(int id);
    }
}
