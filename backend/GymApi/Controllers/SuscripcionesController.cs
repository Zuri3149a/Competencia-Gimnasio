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

        public SuscripcionesController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Suscripciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SuscripcionesMembresium>>> Get() 
        {
            // Nota: EF Core suele mantener los nombres de navegación coherentes, 
            // pero si te da error en .Include, revisa el archivo SuscripcionesMembresium.cs
            return await _context.SuscripcionesMembresia
                .Include(s => s.IdUsuarioNavigation)
                .Include(s => s.IdMembresiaNavigation)
                .ToListAsync();
        }

        // POST: api/Suscripciones
        [HttpPost]
        public async Task<ActionResult<SuscripcionesMembresium>> Post(SuscripcionesMembresium suscripcion)
        {
            suscripcion.Estado = "Activa";
            _context.SuscripcionesMembresia.Add(suscripcion);
            await _context.SaveChangesAsync();
            return Ok(suscripcion);
        }
    }
}