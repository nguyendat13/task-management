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
        public async Task<IActionResult> JoinGroup([FromBody] JoinGroupByCodeDTO dto)
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
        [HttpPost("add-by-email-or-username")]
        public async Task<IActionResult> AddMemberByEmailOrUsername([FromBody] AddMemberToGroupDTO dto)
        {
            try
            {
                var result = await _service.AddMemberByEmailOrUsernameAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpDelete("{groupId}/remove/{userId}")]
        public async Task<IActionResult> RemoveMember(int groupId, int userId)
        {
            var success = await _service.RemoveMemberAsync(groupId, userId);
            if (!success) return NotFound("Không tìm thấy thành viên trong nhóm.");
            return Ok(new { message = "Xóa thành viên thành công" });
        }

        [HttpPost("{groupId}/assign-leader")]
        public async Task<IActionResult> AssignLeader(int groupId, [FromBody] AssignLeaderDTO dto)
        {
            try
            {
                await _service.AssignLeaderAsync(groupId, dto.NewLeaderId);
                return Ok(new { message = "Đã ủy quyền nhóm trưởng." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}
