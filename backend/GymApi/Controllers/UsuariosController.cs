using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;
using GymApi.DTOs;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly GymDbContext _context;

        // Constructor con nombre idéntico a la clase
        public UsuariosController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios (Obtener todos los socios)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios
                .OrderByDescending(u => u.FechaRegistro)
                .ToListAsync();
        }

        // POST: api/Usuarios (Registrar un nuevo socio)
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(UsuarioCreateDto dto)
        {
            var usuario = new Usuario
            {
                NombreCompleto = dto.NombreCompleto,
                Celular = dto.Celular,
                Correo = dto.Correo,
                Ci = dto.Ci,
                Direccion = dto.Direccion,
                Estado = "Activo",
                FechaRegistro = DateTime.Now // Fecha automática
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuarios), new { id = usuario.IdUsuario }, usuario);
        }
    }
}