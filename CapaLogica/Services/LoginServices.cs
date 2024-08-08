using CapaDatos;
using CapaEntidades.Models;
using CapaLogica.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace CapaLogica.Services
{
    public class LoginServices: ILogin
    {
        private readonly FinalP2Context context;

        public LoginServices(FinalP2Context context)
        {
            this.context = context;
        }

        public (bool Success, string message, Usuario user) ValidUser(Credentials credentials)
        {
            string email = credentials.Email;
            string password = credentials.Password;

            var Users = context.Usuarios.ToList();

            foreach (Usuario user in Users)
            {
                // Si el correo se encuentra registrado
                if (user.Email == email)
                {
                    if (user.Password == password)
                    {
                        //Si la contraseña es correcta  retorna el usuario y status 200
                        return (true, "Ok", user);
                    }
                    else
                    {
                        // Si no retorna 401
                        return (false, "Unauthorized", user);
                    }
                }
            }
            // Si no se encuentra registrado retorna 404
            return (false, "NotFound", new Usuario());
        }
    }
}
