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
        // PUT: api/Usuarios/5 (Actualizar socio)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest("El ID no coincide.");
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usuarios.Any(e => e.IdUsuario == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/5 (Eliminar socio)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }        
    }
}