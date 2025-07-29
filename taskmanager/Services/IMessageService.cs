using taskmanager.DTOs.Message;
using taskmanager.Models;

public interface IMessageService
{
    Task<IEnumerable<MessageResponseDTO>> GetMessagesAsync(int userId1, int userId2);
    Task<MessageResponseDTO> SendMessageAsync(MessageDTO dto);
    Task MarkAsReadAsync(int messageId);
}
