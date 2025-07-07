
using taskmanager.DTOs.Group;

namespace taskmanager.Services
{
    public interface IGroupService
    {
        Task<List<GroupDTO>> GetAllGroupsAsync();
        Task<GroupDTO?> GetGroupByIdAsync(int id);
        Task<List<GroupDTO>> GetGroupsByUserIdAsync(int userId);
       Task<GroupDTO> CreateGroupAsync(GroupCreateDTO groupCreateDto);
        Task<bool> UpdateGroupAsync(int id, GroupUpdateDTO groupUpdateDto);
        Task<bool> DeleteGroupAsync(int groupId, int userId);
    }
}
