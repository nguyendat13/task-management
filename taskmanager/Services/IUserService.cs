using taskmanager.DTOs.User;

namespace taskmanager.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDTO>> GetAllUsersAsync();
        Task<UserResponseDTO?> GetUserByIdAsync(int id);
        Task<UserResponseDTO> CreateUserAsync(UserDTO userDto);
        Task<bool> UpdateUserAsync(int id, UserUpdateDTO userUpdateDto);
        Task<bool> DeleteUserAsync(int id);
    }
}
