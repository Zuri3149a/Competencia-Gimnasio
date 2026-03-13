using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly GymDbContext _context;

        public DashboardController(GymDbContext context)
        {
            _context = context;
        }

        /// 
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalSocios = await _context.Usuarios.CountAsync();
            var suscripcionesActivas = await _context.SuscripcionesMembresia.CountAsync();

            // CAMBIO AQUÍ: Usamos .Membresia en lugar de .IdMembresiaNavigation
            var ingresosTotales = await _context.SuscripcionesMembresia
                .Include(s => s.Membresia) 
                .SumAsync(s => s.Membresia != null ? s.Membresia.Precio : 0);

            var hoy = DateTime.Today;
            var asistenciasHoy = await _context.Asistencias
                .CountAsync(a => a.FechaHora.Date == hoy);

            return Ok(new {
                totalSocios,
                suscripcionesActivas,
                ingresosTotales,
                asistenciasHoy
            });
        }
    }
}