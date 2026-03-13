using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntrenadoresController : ControllerBase
    {
        private readonly GymDbContext _context;

        public EntrenadoresController(GymDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entrenadore>>> Get() 
            => await _context.Entrenadores.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Entrenadore>> Post(Entrenadore entrenador)
        {
            _context.Entrenadores.Add(entrenador);
            await _context.SaveChangesAsync();
            return Ok(entrenador);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Entrenadore entrenador)
        {
            if (id != entrenador.IdEntrenador) return BadRequest();
            _context.Entry(entrenador).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entrenador = await _context.Entrenadores.FindAsync(id);
            if (entrenador == null) return NotFound();
            _context.Entrenadores.Remove(entrenador);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}