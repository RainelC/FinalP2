using CapaDatos;
using CapaEntidades.Models;
using CapaLogica.Interfaces;

namespace CapaLogica.Services
{
    public class DoctorServices : IDoctores
    {
        private readonly FinalP2Context context;

        public DoctorServices(FinalP2Context context)
        {
            this.context = context;
        }
        public (bool Success, string message, DoctorPlantilla doctor) CreateDoctor(DoctorPlantilla doctor)
        {
            string cedula = doctor.PhoneNumber;
            string correo = doctor.Email;

            try
            {
                var ConflictEmail = context.Usuarios.Where(x => x.Email == correo);
                var ConflictPhone = context.Doctores.Where(x => x.PhoneNumber == cedula && x.PhoneNumber != null);

                if (ConflictEmail.Any())
                {
                    return (false, "ConflictMail", doctor);
                }
                if (ConflictPhone.Any())
                {
                    return (false, "ConflictPhone", doctor);
                }

                context.Usuarios.Add(new Usuario
                {
                    Name = doctor.Name,
                    LastName = doctor.LastName,
                    Email = doctor.Email,
                    Password = doctor.Password,
                    Tipo_usuario_id = 2
                });

                context.SaveChanges();
                int IDUsuario = context.Usuarios.OrderByDescending(x => x.ID).First().ID;

                context.Doctores.Add(new Doctor
                {
                    PhoneNumber = doctor.PhoneNumber,
                    Medical_License = doctor.Medical_License,
                    IDEspecialidad = doctor.Especialidad,
                    IDUsuario = IDUsuario
                });
                context.SaveChanges();
                return (true, "Ok", doctor);
            }
            catch
            {
                return (false, "BadRequest", doctor);
            }
        }

        public bool DeleteDoctor(int id)
        {
            var doctor = context.Doctores.Find(id);

            if (doctor != null) 
            {
                var usuario = context.Usuarios.Find(doctor.IDUsuario);
                if (usuario != null)
                {
                    context.Remove(usuario);
                    context.Remove(doctor);
                    context.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        public List<DoctorPlantilla> GetDoctors()
        {
            var query = from doctores in context.Doctores
                        join usuarios in context.Usuarios on doctores.IDUsuario equals usuarios.ID
                        join especialidad in context.Especialidades on doctores.IDEspecialidad equals especialidad.ID
                        select new DoctorPlantilla
                        {
                            ID = doctores.ID,
                            Name = usuarios.Name,
                            LastName = usuarios.LastName,
                            PhoneNumber = doctores.PhoneNumber,
                            Medical_License = doctores.Medical_License,
                            Especialidad = especialidad.ID,
                            Email = usuarios.Email,
                            Password = usuarios.Password
                        };
            return query.ToList();
        }

        public (bool Success, string message, DoctorPlantilla doctor) UpdateDoctor(DoctorPlantilla doctor)
        {
            try
            {
                var doctorOld = context.Doctores.FirstOrDefault(u => u.ID == doctor.ID);
                if (doctorOld == null)
                {
                    return (false, "NotFound", doctor);
                }

                var usuario = context.Usuarios.FirstOrDefault(u => u.ID == doctorOld.IDUsuario);
                if (usuario == null)
                {
                    return (false, "NotFound", doctor);
                }

                string number = doctor.PhoneNumber;
                string correo = doctor.Email;

                var ConflictEmail = context.Usuarios.Where(x => x.Email == correo);
                var ConflictPhone = context.Doctores.Where(x => x.PhoneNumber == number && x.PhoneNumber != null);

                if (ConflictEmail.Any() && correo != doctor.Email)
                {
                    return (false, "ConflictMail", doctor);
                }
                if (ConflictPhone.Any() && number != doctor.PhoneNumber)
                {
                    return (false, "ConflictPhone", doctor);
                }

                usuario.Name = doctor.Name;
                usuario.LastName = doctor.LastName;
                doctorOld.PhoneNumber = doctor.PhoneNumber;
                doctorOld.Medical_License = doctor.Medical_License;
                doctorOld.IDEspecialidad = doctor.Especialidad;
                usuario.Email = doctor.Email;
                usuario.Password = doctor.Password;
                context.SaveChanges();
                return (true, "Ok", doctor);
                
            }
            catch
            {
                return (false, "BadRequest", doctor);
            }
        }
    }
}
