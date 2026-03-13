using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Entrenadore
{
    public int IdEntrenador { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string? Especialidad { get; set; }

    public string Celular { get; set; } = null!;

    public string? Correo { get; set; }

    public string Ci { get; set; } = null!;

    public int? Edad { get; set; }

    public string? Designacion { get; set; }

    public string? FotoUrl { get; set; }

    public string? Estado { get; set; }

    public virtual ICollection<Clase> Clases { get; set; } = new List<Clase>();

    public virtual ICollection<HorariosPersonal> HorariosPersonals { get; set; } = new List<HorariosPersonal>();
}
