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
    public async Task<IActionResult> Create([FromForm] CreateTaskDTO dto)
    {
        try
        {
            var createdTask = await _service.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message
            });
        }

    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] CreateTaskDTO dto)
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





    [HttpGet("{id}/attachment")]
    public async Task<IActionResult> GetAttachment(int id)
    {
        var path = await _service.GetAttachmentPathAsync(id);
        if (string.IsNullOrEmpty(path))
            return NotFound("Không có file đính kèm.");

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/'));
        if (!System.IO.File.Exists(filePath))
            return NotFound("Tệp không tồn tại.");

        var contentType = GetContentType(filePath);
        return PhysicalFile(filePath, contentType, Path.GetFileName(filePath));
    }

    [HttpGet("{id}/submission")]
    public async Task<IActionResult> GetSubmission(int id)
    {
        var path = await _service.GetSubmissionFilePathAsync(id);
        if (string.IsNullOrEmpty(path))
            return NotFound("Không có file đã nộp.");

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/'));
        if (!System.IO.File.Exists(filePath))
            return NotFound("Tệp không tồn tại.");

        var contentType = GetContentType(filePath);
        return PhysicalFile(filePath, contentType, Path.GetFileName(filePath));
    }

    // Hàm phụ trợ lấy content-type
    private string GetContentType(string path)
    {
        var ext = Path.GetExtension(path).ToLowerInvariant();
        return ext switch
        {
            ".txt" => "text/plain",
            ".pdf" => "application/pdf",
            ".doc" or ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" or ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".png" => "image/png",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".gif" => "image/gif",
            _ => "application/octet-stream"
        };
    }

}
