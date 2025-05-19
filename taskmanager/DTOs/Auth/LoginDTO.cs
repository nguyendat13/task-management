using System.ComponentModel.DataAnnotations;

namespace taskmanager.DTOs.Auth
{
    public class LoginDTO
    {
        [Required]
        public string UserNameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
