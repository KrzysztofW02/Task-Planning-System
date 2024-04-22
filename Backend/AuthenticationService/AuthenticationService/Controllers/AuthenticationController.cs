using AuthenticationService.Models;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IUserService _userService;
        private IJWTService _JWTService;
        public AuthenticationController(IUserService userService, IJWTService jwtService)
        {
            _userService = userService;
            _JWTService = jwtService;
        }


        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            if(_userService.AreUserCredendialsValid(model.Password, model.Username))
            {
                return Ok(_JWTService.GenerateSecurityToken(model.Username));
            }
            else
            {
                return Unauthorized();
            }
        }

        // POST api/<AuthenticationController>
        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var result = _userService.AddUser(model.Username, model.Password);

            if(result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest("User already exists");
            }

        }


        // DELETE api/<AuthenticationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
