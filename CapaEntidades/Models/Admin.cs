using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public int IDUsuario { get; set; }
        public string Nivel_acceso { get; set; }

    }
}
