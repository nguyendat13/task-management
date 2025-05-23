using taskmanager.DTOs.WorkProgress;

namespace taskmanager.Services
{
    public interface IWorkProgressService
    {
        Task<IEnumerable<WorkProgressDTO>> GetAllAsync();
        Task<WorkProgressDTO?> GetByIdAsync(int id);
        Task<WorkProgressDTO> CreateAsync(CreateWorkProgressDTO dto);
        Task<bool> UpdateAsync(int id, CreateWorkProgressDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
