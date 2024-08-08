using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class Paciente
    {
        public int ID { get; set; }
        public DateTime? Birthdate { get; set; }
        public bool Sex { get; set; }
        public string? Cedula { get; set; }
        public string? PhoneNumber { get; set; }
        public int IDUsuario { get; set; }
    }
}
