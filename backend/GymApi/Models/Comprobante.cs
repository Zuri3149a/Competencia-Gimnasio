using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Comprobante
{
    public int IdComprobante { get; set; }

    public int IdUsuario { get; set; }

    public DateTime? Fecha { get; set; }

    public decimal Monto { get; set; }

    public string Concepto { get; set; } = null!;

    public string MetodoPago { get; set; } = null!;

    public string? EstadoPago { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
