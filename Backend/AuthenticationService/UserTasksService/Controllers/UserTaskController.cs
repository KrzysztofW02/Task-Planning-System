using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserTasksService.DTOs;
using UserTasksService.Models;
using UserTasksService.Services;

namespace UserTasksService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class UserTaskController : Controller
    {
        private IUserTaskService _userTasksService;
        public UserTaskController(IUserTaskService userTasksService)
        {
            _userTasksService = userTasksService;
        }
        [HttpGet]
        public IActionResult GetAllUserTasks(string UserName)
        {
            var userTasks = _userTasksService.GetUserTasks(UserName);
            if(userTasks == null)
            {
                return NotFound();
            }
            return Ok(userTasks);
        }
        [HttpPost]
        public IActionResult AddUserTask([FromBody] UserTask userTask)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            var result = _userTasksService.AddUserTask(userTask);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("User task already exists");
            }
        }
        [HttpPut]
        public IActionResult UpdateUserTask([FromBody] UserTask userTask)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            var result = _userTasksService.UpdateUserTask(userTask);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Couldn't update task");
            }
        }
        [HttpDelete]
        public IActionResult DeleteUserTask(string taskId)
        {
            var result = _userTasksService.DeleteUserTask(taskId);
            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("User task does not exist");
            }
        }
    }
}
