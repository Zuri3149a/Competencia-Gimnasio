using System;
using System.Collections.Generic;

namespace GymApi.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreCompleto { get; set; } = null!;

    public string? Ci { get; set; }

    public string? Direccion { get; set; }

    public string Celular { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? FotoUrl { get; set; }

    public string? Observaciones { get; set; }

    public string? QuienAtendio { get; set; }

    public string? Estado { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<Asistencia> Asistencia { get; set; } = new List<Asistencia>();

    public virtual ICollection<Comprobante> Comprobantes { get; set; } = new List<Comprobante>();

    public virtual ICollection<InscripcionesClase> InscripcionesClases { get; set; } = new List<InscripcionesClase>();

    public virtual ICollection<SuscripcionesMembresium> SuscripcionesMembresia { get; set; } = new List<SuscripcionesMembresium>();
}
