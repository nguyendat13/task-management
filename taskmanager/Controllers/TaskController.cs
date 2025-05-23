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
        var createdTask = await _service.CreateTaskAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateTaskDTO dto)
    {
        var result = await _service.UpdateTaskAsync(id, dto);
        return result ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteTaskAsync(id);
        return result ? NoContent() : NotFound();
    }
}
