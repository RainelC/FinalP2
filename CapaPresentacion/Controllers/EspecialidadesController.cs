using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapaPresentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadesController : ControllerBase
    {
        private readonly IEspecialidades service;

        public EspecialidadesController(IEspecialidades service)
        {
            this.service = service;
        }

        [HttpGet]

        public IEnumerable<Especialidad> GetEspecialidads()
        {
            return service.GetEspecialidades();
        }

        [HttpPost("create")]

        public IActionResult CreateEspecialidad(Especialidad especialidad)
        {
            var result = service.CreateEspecialidad(especialidad);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("delete")]
        public IActionResult DeleteEspecialidad(int id)
        {
            var result = service.DeleteEspecialidad(id);

            if (result.Success)
            {
                return Ok();
            }
            else
            {
                if (result.result == "Not found")
                {
                    return NotFound();
                }
                else
                {
                    return Conflict();
                }
            }
        }

        [HttpPut("update")]

        public IActionResult EditEspecialidad(Especialidad especialidad)
        {
            var result = service.UpdateEspecialidad(especialidad);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]

        public IActionResult GetEspecialidad(int id)
        {
            var result =  service.GetEspecialidad(id);

            if (result.Success)
            {
                return Ok(result.espe);
            }
            else
            {
               return BadRequest();
            }

        }

    }
}
