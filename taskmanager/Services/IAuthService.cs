using taskmanager.DTOs.Auth;
using taskmanager.DTOs.User;
using taskmanager.Models;

namespace taskmanager.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(User user);

        Task<UserResponseDTO> RegisterAsync(RegisterDTO dto);
        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);
    }
}
