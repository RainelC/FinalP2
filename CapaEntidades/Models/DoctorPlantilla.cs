﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades.Models
{
    public class DoctorPlantilla
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Medical_License { get; set; }
        public int Especialidad { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
