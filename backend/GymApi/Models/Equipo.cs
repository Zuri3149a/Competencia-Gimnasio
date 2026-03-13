using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Equipo
{
    public int IdEquipo { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Capacidad { get; set; }

    public string? Estado { get; set; }
}
