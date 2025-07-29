using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs;
using taskmanager.DTOs.Message;
using taskmanager.Models;
using taskmanager.Services;

public class MessageServiceImpl : IMessageService
{
    private readonly AppDbContext _context;

    public MessageServiceImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MessageResponseDTO>> GetMessagesAsync(int userId1, int userId2)
    {
        var messages = await _context.Messages
            .Where(m =>
                (m.SenderId == userId1 && m.ReceiverId == userId2) ||
                (m.SenderId == userId2 && m.ReceiverId == userId1))
            .OrderBy(m => m.CreatedAt)
            .Include(m => m.Sender)
            .Include(m => m.Receiver)
            .ToListAsync();

        return messages.Select(m => new MessageResponseDTO
        {
            Id = m.Id,
            SenderId = m.SenderId,
            SenderUsername = m.Sender.Username,
            ReceiverId = m.ReceiverId,
            ReceiverUsername = m.Receiver.Username,
            TaskId = m.TaskId,
            Content = m.Content,
            IsRead = m.IsRead,
            CreatedAt = m.CreatedAt
        });
    }


    public async Task<MessageResponseDTO> SendMessageAsync(MessageDTO dto)
    {
        var message = new Message
        {
            SenderId = dto.SenderId,
            ReceiverId = dto.ReceiverId,
            TaskId = dto.TaskId == 0 ? null : dto.TaskId,
            Content = dto.Content,
            IsRead = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        // Lấy user để map DTO trả về
        var sender = await _context.Users.FindAsync(dto.SenderId);
        var receiver = await _context.Users.FindAsync(dto.ReceiverId);

        return new MessageResponseDTO
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderUsername = sender?.Username,
            ReceiverId = message.ReceiverId,
            ReceiverUsername = receiver?.Username,
            TaskId = message.TaskId,
            Content = message.Content,
            IsRead = message.IsRead,
            CreatedAt = message.CreatedAt
        };
    }


    public async Task MarkAsReadAsync(int messageId)
    {
        var message = await _context.Messages.FindAsync(messageId);
        if (message != null && !message.IsRead)
        {
            message.IsRead = true;
            message.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
