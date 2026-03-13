using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema; // <--- AGREGA ESTO

namespace GymApi.Models;

public partial class Membresia
{
    public int IdMembresia { get; set; }

    public string Nombre { get; set; } = null!;

    // Mapeamos el nombre exacto de la columna en la DB
    [Column("precio")] 
    public decimal Precio { get; set; } 

    [Column("duracion_dias")] // <--- ESTO ES LA CLAVE
    public int DuracionDias { get; set; }

    public virtual ICollection<SuscripcionesMembresium>? SuscripcionesMembresia { get; set; }
}