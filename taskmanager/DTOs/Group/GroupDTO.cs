namespace taskmanager.DTOs.Group
{
    public class GroupDTO
    {
        public int Id { get; set; }
        public string? Duty { get; set; }
        public string? Name { get; set; }

        public string GroupCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<string>? TaskTitles { get; set; } //có thể null

    }
}
