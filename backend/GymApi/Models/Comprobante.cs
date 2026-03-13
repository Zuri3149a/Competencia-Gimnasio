using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models;

[Table("comprobantes")]
public partial class Comprobante
{
    [Key]
    [Column("id_comprobante")]
    public int IdComprobante { get; set; }

    [Column("id_usuario")]
    public int IdUsuario { get; set; }

    [Column("fecha")]
    public DateTime? Fecha { get; set; } = DateTime.Now;

    [Column("monto")]
    public decimal Monto { get; set; }

    [Column("concepto")]
    public string Concepto { get; set; } = null!;

    [Column("metodo_pago")]
    public string MetodoPago { get; set; } = null!;

    [Column("estado_pago")]
    public string? EstadoPago { get; set; } = "Pagado";

    [ForeignKey("IdUsuario")]
    public virtual Usuario? Usuario { get; set; }
}