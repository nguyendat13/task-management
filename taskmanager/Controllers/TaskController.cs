using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs;
using taskmanager.DTOs.Task;
using taskmanager.Services;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    public TaskController(ITaskService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllTasksAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var task = await _service.GetTaskByIdAsync(id);
        return task == null ? NotFound() : Ok(task);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId) => Ok(await _service.GetTasksByUserIdAsync(userId));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDTO dto)
    {
        try
        {
            var createdTask = await _service.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateTaskDTO dto)
    {

        var success = await _service.UpdateTaskAsync(id, dto);
        if (!success)
            return NotFound(new { message = "Không tìm thấy công việc." });

        return Ok(true); // hoặc return Ok(new { success = true });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteTaskAsync(id);
        return result ? NoContent() : NotFound();
    }

    // Lấy danh sách công việc cá nhân của user
    [HttpGet("personal/user/{userId}")]
    public async Task<IActionResult> GetPersonalTasksByUserId(int userId)
    {
        var tasks = await _service.GetPersonalTasksAsync(userId);
        return Ok(tasks);
    }
}
