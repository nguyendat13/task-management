namespace taskmanager.DTOs.User
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Gender { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public int? RoleId { get; set; }
        public string? LoginStatus { get; set; }

    }
}
