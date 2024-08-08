namespace CapaEntidades.Models

{
    public class PacientePlantilla
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public DateTime? Birthdate { get; set; }
        public bool Sex { get; set; }
        public string? Cedula { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
    }
}
