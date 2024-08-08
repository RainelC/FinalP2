using CapaEntidades.Models;
using CapaLogica.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapaPresentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin services;

        public LoginController(ILogin services)
        {
            this.services = services;
        }


        [HttpPost]

        public IActionResult Login(Credentials credentials)
        {
            var result = services.ValidUser(credentials);

            if (result.Success)
            {
                return Ok(result.user);
            }
            else
            {
                if (result.message == "Unauthorized")
                {
                    return Unauthorized();
                }
                else
                {
                    return NotFound();
                }
            }

        }
    }
}
