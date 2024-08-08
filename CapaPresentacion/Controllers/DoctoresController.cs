using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapaPresentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctoresController : ControllerBase
    {
        private readonly IDoctores service;

        public DoctoresController(IDoctores service)
        {
            this.service = service;
        }

        [HttpGet]

        public IEnumerable<DoctorPlantilla> GetDoctores()
        {
           return service.GetDoctors();
        }

        [HttpPost("create")]

        public IActionResult CreateDoctor(DoctorPlantilla doctor)
        {
            var result = service.CreateDoctor(doctor);
            if (result.Success)
            {
                return Ok(result.doctor);
            }
            else
            {
                if (result.message == "ConflictMail")
                {
                    return Conflict("""{"error": "Mail conflict"}""");
                }
                else
                {
                    if (result.message == "ConflictPhone")
                    {
                        return Conflict("""{"error": "Phone conflict"}""");
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
        }

        [HttpDelete("delete")]

        public IActionResult DeleteDoctor(int id)
        {
            bool result = service.DeleteDoctor(id);

            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("update")]

        public IActionResult EditDoctor(DoctorPlantilla doctor)
        {
            var result = service.UpdateDoctor(doctor);

            if (result.Success)
            {
                return Ok();
            }
            else
            {
                if (result.message == "ConflictMail")
                {
                    return Conflict("""{"error": "Mail conflict"}""");
                }
                else
                {
                    if (result.message == "ConflictPhone")
                    {
                        return Conflict("""{"error": "Phone conflict"}""");
                    }
                    else
                    {
                        if(result.message == "NotFound"){
                            return NotFound();
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                }
            }
        }

    }
}
