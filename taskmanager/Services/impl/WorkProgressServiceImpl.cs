using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs;
using taskmanager.DTOs.WorkProgress;
using taskmanager.Models;

namespace taskmanager.Services.impl
{
    public class WorkProgressServiceImpl : IWorkProgressService
    {
        private readonly AppDbContext _context;

        public WorkProgressServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkProgressDTO>> GetAllAsync()
        {
            return await _context.WorkProgresses
                .Select(wp => new WorkProgressDTO
                {
                    Id = wp.Id,
                    Status = wp.Status
                }).ToListAsync();
        }

        public async Task<WorkProgressDTO?> GetByIdAsync(int id)
        {
            var wp = await _context.WorkProgresses.FindAsync(id);
            return wp == null ? null : new WorkProgressDTO { Id = wp.Id, Status = wp.Status };
        }

        public async Task<WorkProgressDTO> CreateAsync(CreateWorkProgressDTO dto)
        {
            var wp = new WorkProgress { Status = dto.Status };
            _context.WorkProgresses.Add(wp);
            await _context.SaveChangesAsync();

            return new WorkProgressDTO { Id = wp.Id, Status = wp.Status };
        }

        public async Task<bool> UpdateAsync(int id, CreateWorkProgressDTO dto)
        {
            var wp = await _context.WorkProgresses.FindAsync(id);
            if (wp == null) return false;

            wp.Status = dto.Status;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var wp = await _context.WorkProgresses.FindAsync(id);
            if (wp == null) return false;

            _context.WorkProgresses.Remove(wp);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
