namespace taskmanager.DTOs.Group
{
    public class GroupItemUserDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public bool IsLeader { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
