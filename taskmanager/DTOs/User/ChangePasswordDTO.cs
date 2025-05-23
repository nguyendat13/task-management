namespace taskmanager.DTOs.User
{
    public class ChangePasswordDTO
    {
        public int UserId { get; set; } // hoặc lấy từ JWT
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

}
