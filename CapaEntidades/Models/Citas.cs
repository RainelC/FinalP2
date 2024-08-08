using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class Citas
    {
        public int ID { get; set; }
        public int IDPaciente { get; set; }
        public int IDDoctor { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }
        public bool Estado { get; set; }

    }
}
