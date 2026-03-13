using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class InscripcionesClase
{
    public int IdClase { get; set; }

    public int IdUsuario { get; set; }

    public DateTime? FechaInscripcion { get; set; }

    public virtual Clase IdClaseNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
