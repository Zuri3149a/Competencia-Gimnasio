using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasesController : ControllerBase
    {
        private readonly GymDbContext _context;
        public ClasesController(GymDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Get()
        {
            return await _context.Clases
                .Include(c => c.IdEntrenadorNavigation)
                .Select(c => new {
                    c.IdClase,
                    c.Nombre,
                    c.Horario,
                    c.IdEntrenador,
                    NombreEntrenador = c.IdEntrenadorNavigation != null 
                        ? c.IdEntrenadorNavigation.Nombres + " " + c.IdEntrenadorNavigation.Apellidos 
                        : "Sin asignar"
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Clase>> Post(Clase clase)
        {
            _context.Clases.Add(clase);
            await _context.SaveChangesAsync();
            return Ok(clase);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var clase = await _context.Clases.FindAsync(id);
            if (clase == null) return NotFound();
            _context.Clases.Remove(clase);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}