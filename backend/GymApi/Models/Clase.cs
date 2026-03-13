using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Clase
{
    public int IdClase { get; set; }

    public string Nombre { get; set; } = null!;

    public string Horario { get; set; } = null!;

    public int Capacidad { get; set; }

    public int? IdEntrenador { get; set; }

    public string? TipoCurso { get; set; }

    public virtual Entrenadore? IdEntrenadorNavigation { get; set; }

    public virtual ICollection<InscripcionesClase> InscripcionesClases { get; set; } = new List<InscripcionesClase>();
}
