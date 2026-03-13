using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscripcionesController : ControllerBase
    {
        private readonly GymDbContext _context;
        public SuscripcionesController(GymDbContext context) { _context = context; }

        // Listar con Nombres de Usuario y Plan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Get()
        {
            // Usamos los nuevos nombres de navegación: Usuario y Membresia
            return await _context.SuscripcionesMembresia
                .Include(s => s.Usuario)   // Antes: IdUsuarioNavigation
                .Include(s => s.Membresia) // Antes: IdMembresiaNavigation
                .Select(s => new {
                    s.IdSuscripcion,
                    s.IdUsuario,
                    // Usamos el signo "?" para evitar errores si el objeto es nulo
                    NombreUsuario = s.Usuario != null ? s.Usuario.NombreCompleto : "Sin Nombre",
                    s.IdMembresia,
                    NombrePlan = s.Membresia != null ? s.Membresia.Nombre : "Sin Plan",
                    s.FechaInicio,
                    s.FechaFin,
                    s.Estado
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<SuscripcionesMembresium>> Post(SuscripcionesMembresium suscripcion)
        {
            try 
            {
                _context.SuscripcionesMembresia.Add(suscripcion);
                await _context.SaveChangesAsync();
                return Ok(suscripcion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al guardar suscripción: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var suscripcion = await _context.SuscripcionesMembresia.FindAsync(id);
            if (suscripcion == null) return NotFound();
            
            _context.SuscripcionesMembresia.Remove(suscripcion);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}