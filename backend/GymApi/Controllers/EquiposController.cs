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
    public EquiposController(GymDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Equipo>>> Get() => await _context.Equipos.ToListAsync();

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> UpdateEstado(int id, [FromBody] string nuevoEstado)
    {
        var equipo = await _context.Equipos.FindAsync(id);
        if (equipo == null) return NotFound();
        
        equipo.Estado = nuevoEstado;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}   
}