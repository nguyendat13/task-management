using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using taskmanager.Data;
using taskmanager.DTOs.Auth;
using taskmanager.DTOs.User;
using taskmanager.Models;

namespace taskmanager.Services.impl
{
    public class AuthServiceImpl : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthServiceImpl(AppDbContext context, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;

        }

        public async Task<UserResponseDTO> RegisterAsync(RegisterDTO dto)
        {
            //var usernameExists = await _context.Users.AnyAsync(u => u.Username == dto.Username);
            //var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);

            //if (usernameExists && emailExists)
            //    throw new Exception("Username và Email đã tồn tại");
            //else if (usernameExists)
            //    throw new Exception("Username đã tồn tại");
            //else if (emailExists)
            //    throw new Exception("Email đã tồn tại");

            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == "user");

            var user = new User
            {
                Name = dto.Name,
                Address = dto.Address,
                Phone = dto.Phone,
                Username = dto.Username,
                Email = dto.Email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                RoleId = defaultRole?.Id
            };

            user.Password = _passwordHasher.HashPassword(user, dto.Password);

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

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Username == dto.UserNameOrEmail || u.Email == dto.UserNameOrEmail);

            if (user == null)
                throw new Exception("Sai thông tin đăng nhập");

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (result != PasswordVerificationResult.Success)
                throw new Exception("Sai thông tin đăng nhập");

            // tạo token
            var token = GenerateJwtToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                Username = user.Username,
                Email = user.Email,
               
                RoleId = user.RoleId
            };
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("phone", user.Phone ?? ""),
            new Claim("address", user.Address ?? ""),


            new Claim("userId", user.Id.ToString()),
            new Claim("roleId", user.RoleId?.ToString() ?? "0")
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
