using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Consultorio
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public int piso { get; set; }
        public int idEspecialidadPorSede { get; set; }
        public virtual EspecialidadPorSede especialidadPorSede { get; set; }
    }
}