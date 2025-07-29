namespace taskmanager.DTOs.Message
{
    public class MessageResponseDTO
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverUsername { get; set; }
        public int? TaskId { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
