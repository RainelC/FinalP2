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
    public class CitasServices: ICitas
    {
        private readonly FinalP2Context context;

        public CitasServices(FinalP2Context context)
        {
            this.context = context;
        }

        public List<CitaPlantilla> GetCitas()
        {


            //var query = context.Citas
            //     .Where(ci => ci.Estado == true && ci.IDPaciente)
            //     .ToListAsync();
            var query = from citas in context.Citas
                        join paciente in context.Pacientes on citas.IDPaciente equals paciente.ID
                        join userpaciente in context.Usuarios on paciente.IDUsuario equals userpaciente.ID
                        join doctor in context.Doctores on citas.IDDoctor equals doctor.ID
                        join userDoctor in context.Usuarios on citas.IDDoctor equals userDoctor.ID
                        join especialidad in context.Especialidades on doctor.IDEspecialidad equals especialidad.ID
                        select new CitaPlantilla
                        {
                            ID = citas.ID,
                            Paciente = userpaciente.Name + " " + userpaciente.LastName,
                            Doctor = userDoctor.Name + " " + userDoctor.LastName,
                            Especialidad = especialidad.Name,
                            Fecha = citas.Fecha.Add(citas.Hora),
                            Estado = citas.Estado
                        };
            return query.ToList();
        }
    }
}
