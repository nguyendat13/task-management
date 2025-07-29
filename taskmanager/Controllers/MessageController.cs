using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs;
using taskmanager.DTOs.Message;
using taskmanager.Services;

[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessageController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpGet("{userId1}/{userId2}")]
    public async Task<IActionResult> GetMessages(int userId1, int userId2)
    {
        var messages = await _messageService.GetMessagesAsync(userId1, userId2);
        return Ok(messages);
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] MessageDTO dto)
    {
        var message = await _messageService.SendMessageAsync(dto);
        return Ok(message);
    }

    [HttpPut("{messageId}/read")]
    public async Task<IActionResult> MarkAsRead(int messageId)
    {
        await _messageService.MarkAsReadAsync(messageId);
        return NoContent();
    }
}
