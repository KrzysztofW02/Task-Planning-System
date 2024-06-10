using GlobalTasksService.Models;
using GlobalTasksService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using System.IdentityModel.Tokens.Jwt;

namespace GlobalTasksService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class GlobalTasksController : Controller
    {
        private IGlobalTasksService _taskService;
        private IMessageService _messageService;
        public GlobalTasksController(IGlobalTasksService taskService, IMessageService massageService)
        {
            _taskService = taskService;
            _messageService = massageService;
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

        [HttpGet("{taskId}")]
        public IActionResult GetGlobalTaskById(string taskId)
        {
            var globalTask = _taskService.GetGlobalTaskById(taskId);
            if(globalTask == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(globalTask);
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
        [HttpPost("AddParticipant")]
        public IActionResult AddParticipantToGlobalTask(string? username, string globalTaskId)
        {
            if (string.IsNullOrEmpty(username))
            {
                username = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
            }
            if (username.IsNullOrEmpty())
            {
                return BadRequest("Invalid username");
            }


            var result = _taskService.AddParticipant(globalTaskId, username);
            if (result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
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
