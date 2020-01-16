using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CitasLimatambo.Models
{
    public class EspecialidadPorSede
    {
        public int ID { get; set; }
        public int idSede { get; set; }
        public int idEspecialidad { get; set; }


        [ForeignKey("idSede")]
        public virtual Sede sede { get; set; }


        [ForeignKey("idEspecialidad")]
        public virtual Especialidad especialidad { get; set; }

        public virtual ICollection<Medico> medicos { get; set; }
    }
}