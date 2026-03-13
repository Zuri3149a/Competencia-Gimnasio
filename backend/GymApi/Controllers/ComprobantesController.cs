using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComprobantesController : ControllerBase
    {
        private readonly GymDbContext _context;

        public ComprobantesController(GymDbContext context) { _context = context; }

        // GET: api/Comprobantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetComprobantes()
        {
            return await _context.Comprobantes
                .Include(c => c.Usuario)
                .OrderByDescending(c => c.Fecha)
                .Select(c => new {
                    c.IdComprobante,
                    c.Fecha,
                    c.Monto,
                    c.Concepto,
                    c.MetodoPago,
                    NombreSocio = c.Usuario != null ? c.Usuario.NombreCompleto : "Socio Eliminado"
                })
                .ToListAsync();
        }

        // GET: api/Comprobantes/corte
        [HttpGet("corte")]
        public async Task<IActionResult> GetCorteCaja()
        {
            var hoy = DateTime.Today;
            var ingresosHoy = await _context.Comprobantes
                .Where(c => c.Fecha.HasValue && c.Fecha.Value.Date == hoy)
                .SumAsync(c => c.Monto);

            return Ok(new { total = ingresosHoy });
        }
    }
}