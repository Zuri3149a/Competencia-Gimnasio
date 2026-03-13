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

    [HttpPost("{idUsuario}")]
    public async Task<IActionResult> MarcarAsistencia(int idUsuario)
    {
        var asistencia = new Asistencia { IdUsuario = idUsuario, FechaHora = DateTime.Now };
        _context.Asistencias.Add(asistencia);
        await _context.SaveChangesAsync();
        return Ok(new { mensaje = "Asistencia registrada correctamente" });
    }
}
}