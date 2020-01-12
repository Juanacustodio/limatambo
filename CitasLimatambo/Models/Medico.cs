using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Medico
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public int DNI { get; set; }
        public int idEspecialidadPorSede { get; set; }

        public virtual EspecialidadPorSede especialidadPorSede { get; set; }
    }
}