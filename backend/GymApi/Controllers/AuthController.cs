using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        // El constructor recibe la configuración del appsettings.json
        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Leemos los valores que pusiste en el appsettings.json
            var adminUser = _config["AdminSettings:User"];
            var adminPass = _config["AdminSettings:Pass"];

            // Log para que veas en la terminal qué está llegando
            Console.WriteLine($"Intento de acceso - Usuario: {request.Username}");

            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Datos incompletos.");
            }

            // Comparamos con los datos del archivo de configuración
            if (request.Username.Trim().Equals(adminUser, StringComparison.OrdinalIgnoreCase) 
                && request.Password.Trim() == adminPass)
            {
                return Ok(new 
                { 
                    token = "token-secreto-de-alexander", 
                    user = "Administrador" 
                });
            }

            return Unauthorized("Usuario o contraseña incorrectos.");
        }
    }

    public class LoginRequest {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}