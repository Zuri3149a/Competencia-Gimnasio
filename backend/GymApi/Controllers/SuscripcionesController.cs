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
            return await _context.SuscripcionesMembresia
                .Include(s => s.IdUsuarioNavigation)
                .Include(s => s.IdMembresiaNavigation)
                .Select(s => new {
                    s.IdSuscripcion,
                    s.IdUsuario,
                    NombreUsuario = s.IdUsuarioNavigation.NombreCompleto,
                    s.IdMembresia,
                    NombrePlan = s.IdMembresiaNavigation.Nombre,
                    s.FechaInicio,
                    s.FechaFin,
                    s.Estado
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<SuscripcionesMembresium>> Post(SuscripcionesMembresium suscripcion)
        {
            _context.SuscripcionesMembresia.Add(suscripcion);
            await _context.SaveChangesAsync();
            return Ok(suscripcion);
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