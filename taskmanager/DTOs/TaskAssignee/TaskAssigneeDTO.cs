namespace taskmanager.DTOs.TaskAssignee
{
    public class TaskAssigneeDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } // Tên người dùng được assign task (User.Name)
    }
}
