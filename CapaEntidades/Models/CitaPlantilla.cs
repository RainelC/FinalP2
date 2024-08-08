using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class CitaPlantilla
    {
        public int ID { get; set; }
        public string Paciente { get; set; }
        public string Doctor { get; set; }
        public string Especialidad { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estado { get; set; }
    }
}
