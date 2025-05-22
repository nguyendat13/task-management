using System.ComponentModel.DataAnnotations;

namespace taskmanager.DTOs.User
{
    public class UserDTO
    {
        [Required]
        public string Name { get; set; }

        public string? Address { get; set; }

        [RegularExpression(@"^\d{10}$", ErrorMessage = "Số điện thoại phải gồm đúng 10 chữ số.")]
        public string? Phone { get; set; }
        public string? Gender { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public int? RoleId { get; set; }
    }
}
