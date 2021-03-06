﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CitasLimatambo
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Listado",
                url: "{controller}",
                defaults: new { controller = "Sede", action = "Index"}
            );

            routes.MapRoute(
                name: "Detalle",
                url: "{controller}/{id}",
                defaults: new { controller = "Especialidad", action = "Details", id = UrlParameter.Optional }
            );
        }
    }
}
