using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Especialidad
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string imagen { get; set; }
        public string imagenVector { get; set; }

        public virtual ICollection<EspecialidadPorSede> especialidadesPorSede { get; set; }
    }
}