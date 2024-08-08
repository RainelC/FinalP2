using CapaDatos;
using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CapaLogica.Services
{
    public class PacienteServices : IPacientes
    {
        private readonly FinalP2Context context;

        public PacienteServices(FinalP2Context context)
        {
            this.context = context;
        }
        public List<PacientePlantilla> GetPacientes()
        {
            var query = from pacientes in context.Pacientes
                        join usuarios in context.Usuarios on pacientes.IDUsuario equals usuarios.ID
                        select new PacientePlantilla
                        {
                            ID = pacientes.ID,
                            Name = usuarios.Name,
                            LastName = usuarios.LastName,
                            Birthdate = pacientes.Birthdate,
                            Sex = pacientes.Sex,
                            Cedula = pacientes.Cedula,
                            Email = usuarios.Email,
                            PhoneNumber = pacientes.PhoneNumber,
                            Password = usuarios.Password
                        };
            return query.ToList();
        }
        public (bool Success, string message, PacientePlantilla paciente) CreatePaciente(PacientePlantilla paciente)
        {
            string cedula = paciente.Cedula;
            string correo = paciente.Email;

            try
            {
                var ConflictEmail = context.Usuarios.Where(x => x.Email == correo);
                var ConflictCedula = context.Pacientes.Where(x => x.Cedula == cedula && x.Cedula != null);

                if (ConflictEmail.Any())
                {
                    return (false, "ConflictMail", paciente);
                }
                if (ConflictCedula.Any())
                {
                    return (false, "ConflictCedula", paciente);
                }

                context.Usuarios.Add(new Usuario
                {
                    Name = paciente.Name,
                    LastName = paciente.LastName,
                    Email = paciente.Email,
                    Password = paciente.Password,
                    Tipo_usuario_id = 1
                });

                context.SaveChanges();
                int IDUsuario = context.Usuarios.OrderByDescending(x => x.ID).First().ID;

                if (IDUsuario == 0) { }
                context.Pacientes.Add(new Paciente
                {
                    Birthdate = paciente.Birthdate,
                    Sex = paciente.Sex,
                    Cedula = paciente.Cedula,
                    PhoneNumber = paciente.PhoneNumber,
                    IDUsuario = IDUsuario
                });
                context.SaveChanges();
                return (true, "Ok", paciente);
            }
            catch (Exception ex)
            {
                return (false, "BadRequest", paciente);
            }
        }

        public bool UpdatePaciente(PacientePlantilla paciente)
        {
            try
            {
                var usuario = context.Usuarios.FirstOrDefault(u => u.ID == paciente.ID);
                if (usuario == null)
                {
                    return false; 
                }

                usuario.Name = paciente.Name;
                usuario.LastName = paciente.LastName;
                usuario.Email = paciente.Email;
                usuario.Password = paciente.Password;
                usuario.Tipo_usuario_id = 1;

                int IDUsuario = usuario.ID;

                var pacienteOld = context.Pacientes.FirstOrDefault(x => x.IDUsuario == IDUsuario);
                if (pacienteOld == null)
                {
                    return false; 
                }

                pacienteOld.Birthdate = paciente.Birthdate;
                pacienteOld.Sex = paciente.Sex;
                pacienteOld.Cedula = paciente.Cedula;
                pacienteOld.PhoneNumber = paciente.PhoneNumber;

                context.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }


        bool IPacientes.DeletePaciente(int Id)
        {
            var paciente = context.Pacientes.Find(Id);

            if (paciente != null)
            {
                var usuario = context.Usuarios.Find(paciente.IDUsuario);
                if (usuario != null)
                {
                    context.Usuarios.Remove(usuario);
                    context.Pacientes.Remove(paciente);
                    context.SaveChanges();
                    return true;
                }
            }
            return false;
        }
    }
}
