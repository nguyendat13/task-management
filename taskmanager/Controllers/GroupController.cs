using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs.Group;
using taskmanager.Services;

namespace taskmanager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GroupDTO>>> GetAll()
        {
            var groups = await _groupService.GetAllGroupsAsync();
            return Ok(groups);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDTO>> GetById(int id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null) return NotFound();
            return Ok(group);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetGroupsByUserId(int userId)
        {
            var groups = await _groupService.GetGroupsByUserIdAsync(userId);
            return Ok(groups);
        }

        [HttpPost]
        public async Task<ActionResult<GroupDTO>> Create(GroupCreateDTO groupCreateDto)
        {
            var created = await _groupService.CreateGroupAsync(groupCreateDto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GroupUpdateDTO groupUpdateDto)
        {
            var result = await _groupService.UpdateGroupAsync(id, groupUpdateDto);
            if (!result)
                return NotFound();

            return NoContent();  // update thành công, trả về 204 No Content
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var success = await _groupService.DeleteGroupAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
