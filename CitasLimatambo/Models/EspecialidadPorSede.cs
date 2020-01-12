using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class EspecialidadPorSede
    {
        public int ID { get; set; }
        public int idSede { get; set; }
        public int idEspecialidad { get; set; }

        public virtual Sede sede { get; set; }
        public virtual Especialidad especialidad { get; set; }
    }
}