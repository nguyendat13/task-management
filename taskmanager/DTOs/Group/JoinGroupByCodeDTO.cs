namespace taskmanager.DTOs.Group
{
    public class JoinGroupByCodeDTO
    {
        public string GroupCode { get; set; } = string.Empty;
        public int UserId { get; set; }
        public bool IsLeader { get; set; } = false;

    }
}
