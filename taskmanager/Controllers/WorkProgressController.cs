using Microsoft.AspNetCore.Mvc;
using taskmanager.DTOs;
using taskmanager.DTOs.WorkProgress;
using taskmanager.Services;

namespace taskmanager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkProgressController : ControllerBase
    {
        private readonly IWorkProgressService _service;

        public WorkProgressController(IWorkProgressService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var wp = await _service.GetByIdAsync(id);
            return wp == null ? NotFound() : Ok(wp);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateWorkProgressDTO dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateWorkProgressDTO dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
