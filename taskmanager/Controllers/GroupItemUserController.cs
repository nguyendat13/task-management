using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs.Group;
using taskmanager.Services;

namespace taskmanager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupItemUserController : ControllerBase
    {
        private readonly IGroupItemUserService _service;

        public GroupItemUserController(IGroupItemUserService service)
        {
            _service = service;
        }

        [HttpPost("join")]
        public async Task<IActionResult> Join([FromBody] CreateGroupItemUserDTO dto)
        {
            try
            {
                var result = await _service.JoinGroupAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("leave")]
        public async Task<IActionResult> Leave([FromQuery] int groupId, [FromQuery] int userId)
        {
            var success = await _service.LeaveGroupAsync(groupId, userId);
            return success ? NoContent() : NotFound();
        }

        [HttpGet("group/user/{groupId}")]
        public async Task<IActionResult> GetUsersByGroup(int groupId)
        {
            var result = await _service.GetUsersByGroupIdAsync(groupId);
            return Ok(result);
        }
    }

}
