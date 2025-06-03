namespace taskmanager.DTOs.Group
{
    public class CreateGroupItemUserDTO
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public bool IsLeader { get; set; } = false;
    }
}
