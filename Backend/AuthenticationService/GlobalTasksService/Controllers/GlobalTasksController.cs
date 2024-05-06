﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GlobalTasksService.Controllers
{
    [Authorize]
    [ApiController]
    public class GlobalTasksController : Controller
    {
        // GET: GlobalTasksController
        [HttpGet("GetAll")]
        public ActionResult GetAll()
        {
            return View();
        }

        // GET: GlobalTasksController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: GlobalTasksController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: GlobalTasksController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: GlobalTasksController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: GlobalTasksController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: GlobalTasksController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: GlobalTasksController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
