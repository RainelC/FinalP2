using CapaLogica.Interfaces;
using CapaEntidades.Models;
using CapaLogica.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapaPresentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private readonly IPacientes services;

        public PacientesController(IPacientes services)
        {
            this.services = services;
        }

        [HttpGet]
        public IEnumerable<PacientePlantilla> GetPacientes()
        {
            return services.GetPacientes();
        }

        [HttpPost("create")]

        public IActionResult CreatePaciente(PacientePlantilla paciente)
        {
            var result = services.CreatePaciente(paciente);

            if (result.Success)
            {
                return Ok(result.paciente);
            }
            else
            {
                if (result.message == "ConflictCedula")
                {
                    return Conflict("""{"error": "cedula conflict"}""");
                }
                else 
                {
                    if (result.message == "ConflictMail")
                    {
                        return Conflict("""{"error": "Mail conflict"}""");
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
        }

        [HttpDelete("delete")]

        public IActionResult DeletePaciente(int id)
        {
            bool result = services.DeletePaciente(id);

            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }


        [HttpPut("update")]

        public IActionResult EditPaciente(PacientePlantilla paciente)
        {
            var result = services.UpdatePaciente(paciente);

            if (result)
            {
                return Ok();    
            }
            return BadRequest();
        }
    }
}
