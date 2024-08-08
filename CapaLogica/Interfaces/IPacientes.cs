using CapaEntidades.Models;

namespace CapaLogica.Interfaces
{
    public interface IPacientes
    {
        List<PacientePlantilla> GetPacientes();
        (bool Success, string message, PacientePlantilla paciente) CreatePaciente(PacientePlantilla paciente);

        bool UpdatePaciente(PacientePlantilla paciente);
        bool DeletePaciente(int paciente);
    }
}
