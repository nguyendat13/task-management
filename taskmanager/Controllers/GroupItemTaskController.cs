using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using taskmanager.Services;

[ApiController]
[Route("api/[controller]")]
public class GroupItemTaskController : ControllerBase
{
    private readonly IGroupItemTaskService _service;

    public GroupItemTaskController(IGroupItemTaskService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }
    [HttpGet("group/task/{groupId}")]
    public async Task<IActionResult> GetByGroupId(int groupId)
    {
        var items = await _service.GetByGroupIdAsync(groupId);
        return Ok(items);
    }

    [HttpGet("user/task/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var items = await _service.GetByUserIdAsync(userId);
        return Ok(items);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        return result ? NoContent() : NotFound();
    }
}
