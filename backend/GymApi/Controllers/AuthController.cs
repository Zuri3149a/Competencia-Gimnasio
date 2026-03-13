using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // POST: api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Log para depuración (mira la terminal de C# cuando intentes entrar)
            Console.WriteLine($"Intento de login: User={request.Username}, Pass={request.Password}");

            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Datos incompletos");
            }

            // Usamos Equals con OrdinalIgnoreCase para el usuario por si acaso
            if (request.Username.Trim().Equals("admin", StringComparison.OrdinalIgnoreCase) 
                && request.Password.Trim() == "gym123")
            {
                return Ok(new { token = "token-secreto-de-alexander", user = "Administrador" });
            }

            return Unauthorized("Usuario o contraseña incorrectos");
        }
    }

    public class LoginRequest {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}