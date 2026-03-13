using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models;

[Table("suscripciones_membresia")] // Nombre exacto de la tabla en Postgres
public partial class SuscripcionesMembresium
{
    [Key]
    [Column("id_suscripcion")]
    public int IdSuscripcion { get; set; }

    [Column("id_usuario")]
    public int IdUsuario { get; set; }

    [Column("id_membresia")]
    public int IdMembresia { get; set; }

    [Column("fecha_inicio")]
    public DateTime FechaInicio { get; set; } = DateTime.Now;

    [Column("fecha_fin")]
    public DateTime FechaFin { get; set; }

    [Column("estado")]
    public string? Estado { get; set; } = "Activa";

    // RELACIONES (Nombres limpios para usar en los controladores)
    [ForeignKey("IdUsuario")]
    public virtual Usuario? Usuario { get; set; }

    [ForeignKey("IdMembresia")]
    public virtual Membresia? Membresia { get; set; }
}