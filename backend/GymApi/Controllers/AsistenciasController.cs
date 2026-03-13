using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsistenciasController : ControllerBase
    {
        private readonly GymDbContext _context;

        public AsistenciasController(GymDbContext context) { _context = context; }

        // GET: api/Asistencias (Lista las últimas 50 asistencias)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAsistencias()
        {
            return await _context.Asistencias
                .Include(a => a.Usuario)
                .OrderByDescending(a => a.FechaHora)
                .Take(50)
                .Select(a => new {
                    a.IdAsistencia,
                    NombreSocio = a.Usuario != null ? a.Usuario.NombreCompleto : "Desconocido",
                    a.FechaHora
                })
                .ToListAsync();
        }

        // POST: api/Asistencias
        [HttpPost]
        public async Task<ActionResult<Asistencia>> PostAsistencia([FromBody] int idUsuario)
        {
            var asistencia = new Asistencia { IdUsuario = idUsuario, FechaHora = DateTime.Now };
            _context.Asistencias.Add(asistencia);
            await _context.SaveChangesAsync();
            return Ok(asistencia);
        }
    }
}