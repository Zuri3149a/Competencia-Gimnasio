using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class HorariosPersonal
{
    public int IdHorario { get; set; }

    public int? IdEntrenador { get; set; }

    public int? IdAyudante { get; set; }

    public string DiaSemana { get; set; } = null!;

    public string Turno { get; set; } = null!;

    public TimeOnly HoraInicio { get; set; }

    public TimeOnly HoraFin { get; set; }

    public virtual Ayudante? IdAyudanteNavigation { get; set; }

    public virtual Entrenadore? IdEntrenadorNavigation { get; set; }
}
