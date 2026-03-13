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
            return await _context.Membresias.ToListAsync();
        }

        // GET: api/Membresias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Membresia>> GetMembresia(int id)
        {
            var membresia = await _context.Membresias.FindAsync(id);

            if (membresia == null)
            {
                return NotFound();
            }

            return membresia;
        }
        // PUT: api/Membresias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembresia(int id, Membresia membresia)
        {
            if (id != membresia.IdMembresia) return BadRequest();

            _context.Entry(membresia).State = EntityState.Modified;
            await _context.SaveChangesAsync();
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
    }
}