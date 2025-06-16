namespace taskmanager.DTOs.Group
{
    public class AddMemberToGroupDTO
    {
        public int GroupId { get; set; }
        public string EmailOrUsername { get; set; } = string.Empty;
    }
}
