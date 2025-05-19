using taskmanager.DTOs.Auth;
using taskmanager.DTOs.User;

namespace taskmanager.Services
{
    public interface IAuthService
    {
        Task<UserResponseDTO> RegisterAsync(RegisterDTO dto);
        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);
    }
}
