using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
[Route("api/[controller]")]
[ApiController]
public class AyudantesController : ControllerBase
{
    private readonly GymDbContext _context;
    public AyudantesController(GymDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ayudante>>> Get() => await _context.Ayudantes.ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Ayudante>> Post(Ayudante ayudante)
    {
        _context.Ayudantes.Add(ayudante);
        await _context.SaveChangesAsync();
        return Ok(ayudante);
    }
}    
}
