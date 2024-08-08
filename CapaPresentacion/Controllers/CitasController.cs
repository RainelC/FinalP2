using CapaDatos;
using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapaPresentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitasController : ControllerBase
    {
        private readonly ICitas service;

        public CitasController(ICitas service)
        {
            this.service = service;
        }

        [HttpGet]

        public IEnumerable<CitaPlantilla> GetCitas()
        {
            return service.GetCitas();
        }
    }
}
