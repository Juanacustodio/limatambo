using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Cita
    {
        public int ID { get; set; }
        public int idPaciente { get; set; }
        public int idTurno { get; set; }
        public bool activo { get; set; }

        public virtual Paciente paciente { get; set; }
        public virtual Turno turno { get; set; }
    }
}