using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class SuscripcionesMembresium
{
    public int IdSuscripcion { get; set; }

    public int IdUsuario { get; set; }

    public int IdMembresia { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FechaFin { get; set; }

    public string? Estado { get; set; }

    public virtual Membresia? IdMembresiaNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
