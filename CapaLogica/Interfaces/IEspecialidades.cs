using CapaEntidades.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaLogica.Interfaces
{
    public interface IEspecialidades
    {
        List<Especialidad> GetEspecialidades();
        bool CreateEspecialidad(Especialidad especialidad);
        bool UpdateEspecialidad(Especialidad especialidad);
        (bool Success, string result) DeleteEspecialidad(int id);

        (bool Success, Especialidad espe) GetEspecialidad(int id);
    }
}
