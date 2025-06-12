using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.Models;

[Route("api/[controller]")]
[ApiController]
public class GoogleLoginController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public GoogleLoginController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        var result = await HttpContext.AuthenticateAsync("Google");

        if (!result.Succeeded)
            return Unauthorized("Google authentication failed.");

        // Lấy thông tin từ Google
        var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
        var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;

        if (string.IsNullOrEmpty(email))
            return Unauthorized("Email không tồn tại.");

        // Tìm hoặc tạo user mới
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            user = new User
            {
                Email = email,
                Name = name ?? email,
                Username = email.Split('@')[0],
                RoleId = 3, // hoặc mặc định khác
                CreatedAt = DateTime.UtcNow
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

        // Sinh JWT
        var claims = new[]
        {
               new Claim(JwtRegisteredClaimNames.Sub, user.Username),
    new Claim(JwtRegisteredClaimNames.Email, user.Email),
    new Claim("userId", user.Id.ToString()),
    new Claim("roleId", user.RoleId?.ToString() ?? "3"),
    new Claim("phone", user.Phone ?? ""),
     new Claim("name", user.Name ?? ""),

    new Claim("address", user.Address ?? ""),
    new Claim("gender", user.Gender ?? "")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        // 👉 Redirect về frontend và truyền token
        var redirectUrl = $"http://localhost:5173/dang-nhap-google-thanh-cong?token={tokenString}&userId={user.Id}&email={user.Email}";
        return Redirect(redirectUrl);
    }

    [HttpGet("google")]
    public IActionResult GoogleLogin()
    {
        var redirectUrl = Url.Action("GoogleCallback", "GoogleLogin");
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, "Google");
    }

}