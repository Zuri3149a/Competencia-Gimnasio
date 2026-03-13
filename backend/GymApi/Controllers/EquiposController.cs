using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquiposController : ControllerBase
    {
        private readonly GymDbContext _context;

        public EquiposController(GymDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipo>>> Get() 
            => await _context.Equipos.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Equipo>> Post(Equipo equipo)
        {
            _context.Equipos.Add(equipo);
            await _context.SaveChangesAsync();
            return Ok(equipo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Equipo equipo)
        {
            if (id != equipo.IdEquipo) return BadRequest();
            _context.Entry(equipo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);
            if (equipo == null) return NotFound();
            _context.Equipos.Remove(equipo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}