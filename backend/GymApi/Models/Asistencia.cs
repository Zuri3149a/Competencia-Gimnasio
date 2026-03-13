using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models;

[Table("asistencias")] // Mapeo exacto a la tabla
public partial class Asistencia
{
    [Column("id_asistencia")]
    public int IdAsistencia { get; set; }

    [Column("id_usuario")]
    public int IdUsuario { get; set; }

    [Column("fecha_hora")]
    public DateTime FechaHora { get; set; } = DateTime.Now;

    // Propiedad de navegación para traer el nombre del usuario en los GET
    [ForeignKey("IdUsuario")]
    public virtual Usuario? Usuario { get; set; }
}