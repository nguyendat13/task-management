namespace taskmanager.DTOs.Message
{
    public class MessageDTO
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int? TaskId { get; set; }
        public string Content { get; set; }
    }
}
