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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}