namespace GymApi.DTOs
{
    public class UsuarioCreateDto
    {
        public string NombreCompleto { get; set; } = null!;
        public string Celular { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string? Ci { get; set; }
        public string? Direccion { get; set; }
    }
}