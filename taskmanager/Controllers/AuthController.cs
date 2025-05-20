using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using taskmanager.Data;
using taskmanager.DTOs.Auth;
using taskmanager.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context,IAuthService authService)
    {
        _authService = authService;
        _context = context;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto)
    {
        var usernameExists = await _context.Users.AnyAsync(u => u.Username == dto.Username);
        var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);

        if (usernameExists && emailExists)
            return BadRequest(new { message = "Username và Email đã tồn tại" });
        if (usernameExists)
            return BadRequest(new { message = "Username đã tồn tại" });
        if (emailExists)
            return BadRequest(new { message = "Email đã tồn tại" });
        try
        {
            var user = await _authService.RegisterAsync(dto);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        try
        {
            var user = await _authService.LoginAsync(dto);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
