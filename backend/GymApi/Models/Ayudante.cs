using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Ayudante
{
    public int IdAyudante { get; set; }

    public string NombreCompleto { get; set; } = null!;

    public string Ci { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? Ocupacion { get; set; }

    public string? Correo { get; set; }

    public decimal? Sueldo { get; set; }

    public string? FotoUrl { get; set; }

    public string? Estado { get; set; }

    public virtual ICollection<HorariosPersonal> HorariosPersonals { get; set; } = new List<HorariosPersonal>();
}
