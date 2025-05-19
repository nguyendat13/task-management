using System.ComponentModel.DataAnnotations;

namespace taskmanager.DTOs.Auth
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; }

        public string? Address { get; set; }

        public string? Phone { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
