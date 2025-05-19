using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.User;
using taskmanager.Models;
using Microsoft.AspNetCore.Identity;

namespace taskmanager.Services.impl
{
    public class UserServiceImpl : IUserService
    {
        private readonly AppDbContext _context;

        public UserServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserResponseDTO>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(u => new UserResponseDTO
                {
                    Id = u.Id,
                    Name = u.Name,
                    Address = u.Address,
                    Phone = u.Phone,
                    Username = u.Username,
                    Email = u.Email,
                    RoleId = u.RoleId
                }).ToListAsync();
        }

        public async Task<UserResponseDTO?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserResponseDTO
            {
                Id = user.Id,
                Name = user.Name,
                Address = user.Address,
                Phone = user.Phone,
                Username = user.Username,
                Email = user.Email,
                RoleId = user.RoleId
            };
        }

        public async Task<UserResponseDTO> CreateUserAsync(UserDTO userDto)
        {
            // Kiểm tra trùng username hoặc email
            var exists = await _context.Users.AnyAsync(u =>
                u.Username == userDto.Username || u.Email == userDto.Email);

            if (exists)
                throw new Exception("Username hoặc Email đã tồn tại");

            var user = new User
            {
                Name = userDto.Name,
                Address = userDto.Address,
                Phone = userDto.Phone,
                Username = userDto.Username,
                Email = userDto.Email,
                RoleId = userDto.RoleId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            // Mã hóa mật khẩu
            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, userDto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserResponseDTO
            {
                Id = user.Id,
                Name = user.Name,
                Address = user.Address,
                Phone = user.Phone,
                Username = user.Username,
                Email = user.Email,
                RoleId = user.RoleId
            };
        }


        public async Task<bool> UpdateUserAsync(int id, UserDTO userDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            // Kiểm tra username/email mới có trùng với user khác không
            var exists = await _context.Users.AnyAsync(u =>
                u.Id != id && (u.Username == userDto.Username || u.Email == userDto.Email));

            if (exists)
                throw new Exception("Username hoặc Email đã được người khác sử dụng");

            user.Name = userDto.Name;
            user.Address = userDto.Address;
            user.Phone = userDto.Phone;
            user.Username = userDto.Username;
            user.Email = userDto.Email;
            user.RoleId = userDto.RoleId;
            user.UpdatedAt = DateTime.UtcNow;

            // Chỉ cập nhật password nếu có password mới
            if (!string.IsNullOrWhiteSpace(userDto.Password))
            {
                var passwordHasher = new PasswordHasher<User>();
                user.Password = passwordHasher.HashPassword(user, userDto.Password);
            }
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
