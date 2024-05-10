using GlobalTasksService.Models;
using GlobalTasksService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace GlobalTasksService.Controllers
{
    [Authorize]
    [ApiController]
    public class GlobalTasksController : Controller
    {
        private IGlobalTasksService _taskService;
        public GlobalTasksController(IGlobalTasksService taskService)
        {
            _taskService = taskService;
        }

        // GET: GlobalTasksController
        [HttpGet]
        public IActionResult GetAllGlobal()
        {
            var globalTasks = _taskService.GetGlobalTasks(); 
            if(globalTasks == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(globalTasks); ;
            }
        }


        [HttpPost]
        public IActionResult AddGlobalTask([FromBody] GlobalTask globalTask)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            var result = _taskService.AddGlobalTask(globalTask);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Error occured while trying to add task");
            }
        }

        [HttpPut]
        public IActionResult Edit([FromBody] GlobalTask globalTask)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            var result = _taskService.UpdateGlobalTask(globalTask);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Task does not exist");
            }
        }

        [HttpDelete]
        public IActionResult Delete(string taskId)
        {
            var result = _taskService.DeleteGlobalTask(taskId);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Task does not exist");
            }

        }
    }
}
