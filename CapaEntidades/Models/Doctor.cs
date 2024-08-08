using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class Doctor
    {
        public int ID { get; set; }
        public string PhoneNumber { get; set; }
        public string Medical_License { get; set; }
        public int IDEspecialidad { get; set; }
        public int IDUsuario { get; set; }
    }
}
