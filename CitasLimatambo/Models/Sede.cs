using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class Sede
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }

        public virtual ICollection<EspecialidadPorSede> especialidadesPorSede { get; set; }
    }
}