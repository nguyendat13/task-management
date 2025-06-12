using taskmanager.DTOs.Group;

namespace taskmanager.Services
{
    public interface IGroupItemUserService
    {
        Task<GroupItemUserDTO> JoinGroupAsync(JoinGroupByCodeDTO dto);
        Task<bool> LeaveGroupAsync(int groupId, int userId);
        Task<IEnumerable<GroupItemUserDTO>> GetUsersByGroupIdAsync(int groupId);
    }
}
