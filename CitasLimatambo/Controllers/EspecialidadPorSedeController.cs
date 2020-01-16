using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CitasLimatambo.DAL;
using CitasLimatambo.Models;

namespace CitasLimatambo.Controllers
{
    public class EspecialidadPorSedeController : Controller
    {
        private LimatamboContext db = new LimatamboContext();

        // GET: EspecialidadPorSede
        public ActionResult Index()
        {
            return View(db.EspecialidadPorSedes.ToList());
        }

        // GET: EspecialidadPorSede/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EspecialidadPorSede especialidadPorSede = db.EspecialidadPorSedes.Find(id);
            if (especialidadPorSede == null)
            {
                return HttpNotFound();
            }
            return View(especialidadPorSede);
        }

        // GET: EspecialidadPorSede/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: EspecialidadPorSede/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,idSede,idEspecialidad")] EspecialidadPorSede especialidadPorSede)
        {
            if (ModelState.IsValid)
            {
                db.EspecialidadPorSedes.Add(especialidadPorSede);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(especialidadPorSede);
        }

        // GET: EspecialidadPorSede/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EspecialidadPorSede especialidadPorSede = db.EspecialidadPorSedes.Find(id);
            if (especialidadPorSede == null)
            {
                return HttpNotFound();
            }
            return View(especialidadPorSede);
        }

        // POST: EspecialidadPorSede/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,idSede,idEspecialidad")] EspecialidadPorSede especialidadPorSede)
        {
            if (ModelState.IsValid)
            {
                db.Entry(especialidadPorSede).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(especialidadPorSede);
        }

        // GET: EspecialidadPorSede/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EspecialidadPorSede especialidadPorSede = db.EspecialidadPorSedes.Find(id);
            if (especialidadPorSede == null)
            {
                return HttpNotFound();
            }
            return View(especialidadPorSede);
        }

        // POST: EspecialidadPorSede/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EspecialidadPorSede especialidadPorSede = db.EspecialidadPorSedes.Find(id);
            db.EspecialidadPorSedes.Remove(especialidadPorSede);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
