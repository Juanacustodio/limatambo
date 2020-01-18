using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using CitasLimatambo.Models;

using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace CitasLimatambo.DAL
{
    public class LimatamboContext : DbContext
    {
        public LimatamboContext() : base("limatambo")
        {
        }

        public DbSet<Especialidad> Especialidad { get; set; }
        public DbSet<EspecialidadPorSede> EspecialidadPorSedes { get; set; }
        public DbSet<Sede> Sede { get; set; }
        public DbSet<Medico> Medicos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}