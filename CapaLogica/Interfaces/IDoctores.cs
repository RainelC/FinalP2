using CapaEntidades.Models;

namespace CapaLogica.Interfaces
{
    public interface IDoctores
    {
        List<DoctorPlantilla> GetDoctors();
        (bool Success, string message, DoctorPlantilla doctor) CreateDoctor(DoctorPlantilla doctor);
        (bool Success, string message, DoctorPlantilla doctor) UpdateDoctor(DoctorPlantilla doctor);
        bool DeleteDoctor(int id);
    }
}
