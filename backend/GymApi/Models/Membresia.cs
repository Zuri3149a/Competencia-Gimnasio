using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Membresia
{
    public int IdMembresia { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<SuscripcionesMembresium> SuscripcionesMembresia { get; set; } = new List<SuscripcionesMembresium>();
}
