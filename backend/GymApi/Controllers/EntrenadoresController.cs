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
        public EntrenadoresController(GymDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entrenadore>>> Get() => await _context.Entrenadores.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Entrenadore>> Post(Entrenadore entrenador)
        {
            _context.Entrenadores.Add(entrenador);
            await _context.SaveChangesAsync();
            return Ok(entrenador);
        }
    }
}