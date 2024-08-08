using CapaEntidades.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaLogica.Interfaces
{
    public interface ILogin
    {
        (bool Success, string message, Usuario user) ValidUser(Credentials credentials);
    }
}
