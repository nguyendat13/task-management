using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs;
using taskmanager.DTOs.TaskAssignee;
using taskmanager.Services;

namespace taskmanager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskAssigneeController : ControllerBase
    {
        private readonly ITaskAssigneeService _service;

        public TaskAssigneeController(ITaskAssigneeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskAssigneeDTO>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskAssigneeDTO>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpGet("by-task/{taskId}")]
        public async Task<IActionResult> GetByTaskId(int taskId)
        {
            var assignees = await _service.GetByTaskIdAsync(taskId);
            return Ok(assignees);
        }
    }
}
