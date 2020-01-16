using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Medico
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string DNI { get; set; }
        public int idEspecialidadPorSede { get; set; }

        public string foto { get; set; }

        [ForeignKey("idEspecialidadPorSede")]
        public virtual EspecialidadPorSede especialidadPorSede { get; set; }
    }
}