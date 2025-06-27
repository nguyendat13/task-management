using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs.Group;
using taskmanager.Services;

namespace taskmanager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetNotifications(int userId)
        {
            var notifications = await _notificationService.GetUserNotificationsAsync(userId);
            return Ok(notifications);
        }

        // POST: api/Notification/{notificationId}/accept
        [HttpPost("{notificationId}/accept")]
        public async Task<ActionResult<GroupItemUserDTO>> AcceptNotification(int notificationId)
        {
            try
            {
                var result = await _notificationService.AcceptNotificationAsync(notificationId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // POST: api/Notification/{notificationId}/reject
        [HttpPost("{notificationId}/reject")]
        public async Task<IActionResult> RejectNotification(int notificationId)
        {
            try
            {
                await _notificationService.RejectNotificationAsync(notificationId);
                return Ok(new { message = "Đã từ chối thông báo." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/Notification/{notificationId}/read
        [HttpPut("{notificationId}/read")]
        public async Task<IActionResult> MarkAsRead(int notificationId)
        {
            await _notificationService.MarkAsReadAsync(notificationId);
            return NoContent();
        }
    }
}