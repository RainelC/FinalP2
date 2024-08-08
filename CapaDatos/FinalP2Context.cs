using CapaEntidades.Models;
using Microsoft.EntityFrameworkCore;

namespace CapaDatos
{
    public class FinalP2Context: DbContext
    {
        public FinalP2Context(DbContextOptions<FinalP2Context> db):base(db)
        {
            
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Especialidad> Especialidades { get; set; }
        public DbSet<Doctor> Doctores { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Tipo_usuario> Tipo_usuario { get; set; }
        public DbSet<Citas> Citas { get; set; }
    }
}
