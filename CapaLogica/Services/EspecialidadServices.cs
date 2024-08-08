using CapaDatos;
using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaLogica.Services
{
    public class EspecialidadServices : IEspecialidades
    {
        private readonly FinalP2Context context;

        public EspecialidadServices(FinalP2Context context)
        {
            this.context = context;
        }
        public bool CreateEspecialidad(Especialidad especialidad)
        {
            var name = context.Especialidades.Where(x => x.Name == especialidad.Name);

            if (name.Any())
            {
                return false;
            }
            else
            {
                context.Especialidades.Add(especialidad);
                context.SaveChanges();
                return true;
            }
        }
        public (bool Success, string result) DeleteEspecialidad(int id)
        {
            var especialidad = context.Especialidades.Find(id);
            if (especialidad != null)
            {
                var conflict = context.Doctores.Where(x => x.IDEspecialidad == id);
                if (conflict.Any())
                {
                    return (false, "Conflict");
                }
                else
                {
                    context.Especialidades.Remove(especialidad);
                    context.SaveChanges();
                    return (true, "Ok");
                }
            }
            
            return (false, "Not Found");
        }

        public (bool Success, Especialidad espe) GetEspecialidad(int id)
        {
            var especialidad = context.Especialidades.Find(id);

            if (especialidad != null )
            {
                return (true, especialidad);
            }
            else
            {
                return (false, new Especialidad());
            }
        }

        public List<Especialidad> GetEspecialidades()
        {
            return context.Especialidades.ToList();
        }

        public bool UpdateEspecialidad(Especialidad especialidad)
        {
            context.Entry(especialidad).State = EntityState.Modified;
            try
            {
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
