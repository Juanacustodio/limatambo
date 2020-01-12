using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Turno
    {
        public int ID { get; set; }
        public int idEspecialidadPorSede { get; set; }
        public int idMedico { get; set; }
        public int idConsultorio { get; set; }
        public DateTime dia { get; set; }
        public DateTime hora { get; set; }
        public bool reservado { get; set; }

        public virtual EspecialidadPorSede especialidadPorSede { get; set; }
        public virtual Medico medico { get; set; }
        public virtual Consultorio consultorio { get; set; }
    }
}