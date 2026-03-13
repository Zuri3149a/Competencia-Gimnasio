using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembresiasController : ControllerBase
    {
        private readonly GymDbContext _context;

        public MembresiasController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Membresias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membresia>>> GetMembresias()
        {
            // Si aquí da error 500, el problema está en el DbContext (ver paso abajo)
            return await _context.Membresias.ToListAsync();
        }

        // GET: api/Membresias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Membresia>> GetMembresia(int id)
        {
            var membresia = await _context.Membresias.FindAsync(id);
            if (membresia == null) return NotFound();
            return membresia;
        }

        // --- EL MÉTODO QUE FALTABA ---
        // POST: api/Membresias
        [HttpPost]
        public async Task<ActionResult<Membresia>> PostMembresia(Membresia membresia)
        {
            try 
            {
                _context.Membresias.Add(membresia);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetMembresia", new { id = membresia.IdMembresia }, membresia);
            }
            catch (Exception ex)
            {
                // Esto te ayudará a ver el error real en la consola de C#
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // PUT: api/Membresias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembresia(int id, Membresia membresia)
        {
            if (id != membresia.IdMembresia) return BadRequest();

            _context.Entry(membresia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembresiaExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Membresias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembresia(int id)
        {
            var membresia = await _context.Membresias.FindAsync(id);
            if (membresia == null) return NotFound();

            _context.Membresias.Remove(membresia);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool MembresiaExists(int id)
        {
            return _context.Membresias.Any(e => e.IdMembresia == id);
        }
    }
}