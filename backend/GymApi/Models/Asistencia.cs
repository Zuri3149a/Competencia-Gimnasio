using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Asistencia
{
    public int IdAsistencia { get; set; }

    public int IdUsuario { get; set; }

    public DateTime? FechaHora { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
