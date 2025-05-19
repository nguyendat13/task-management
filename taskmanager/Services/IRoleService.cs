using taskmanager.DTOs.Role;

namespace taskmanager.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleResponseDTO>> GetAllAsync();
        Task<RoleResponseDTO?> GetByIdAsync(int id);
        Task<RoleResponseDTO> CreateAsync(RoleDTO dto);
        Task<bool> UpdateAsync(int id, RoleDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
