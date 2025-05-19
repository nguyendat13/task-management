
using Microsoft.EntityFrameworkCore;

using taskmanager.Data;
using taskmanager.DTOs.Role;
using taskmanager.Models;

namespace taskmanager.Services.impl
{
    public class RoleServiceImpl : IRoleService
    {
        private readonly AppDbContext _context;

        public RoleServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleResponseDTO>> GetAllAsync()
        {
            return await _context.Roles.Select(r => new RoleResponseDTO
            {
                Id = r.Id,
                Name = r.Name,
                Priority = r.Priority
            }).ToListAsync();
        }

        public async Task<RoleResponseDTO?> GetByIdAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return null;

            return new RoleResponseDTO
            {
                Id = role.Id,
                Name = role.Name,
                Priority = role.Priority
            };
        }

        public async Task<RoleResponseDTO> CreateAsync(RoleDTO dto)
        {
            var role = new Role
            {
                Name = dto.Name,
                Priority = dto.Priority
            };
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return new RoleResponseDTO
            {
                Id = role.Id,
                Name = role.Name,
                Priority = role.Priority
            };
        }

        public async Task<bool> UpdateAsync(int id, RoleDTO dto)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return false;

            role.Name = dto.Name;
            role.Priority = dto.Priority;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return false;

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
