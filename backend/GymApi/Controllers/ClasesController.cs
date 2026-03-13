using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Data;
using GymApi.Models;

namespace GymApi.Controllers
{
[Route("api/[controller]")]
[ApiController]
public class ClasesController : ControllerBase
{
    private readonly GymDbContext _context;
    public ClasesController(GymDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Clase>>> Get() 
        => await _context.Clases.Include(c => c.IdEntrenadorNavigation).ToListAsync();
}
}