using CarPoolingWebApiReact.Models.Client;
using CarPoolingWebApiReact.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarPoolWebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _UserService;

        public UserController(IUserService userService)
        {
            _UserService = userService;

        }

        [HttpGet]
        [ActionName("getuser")]
        public IActionResult GetUser(string id)
        {
            User user = _UserService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("addnewuser")]
        public IActionResult AddNewUser([FromBody] User user)
        {
            if (user == null)
            {
                return NoContent();
            }
            else if (!_UserService.AddNewUser(user))
            {
                return Ok(user);
            }

            return BadRequest();
        }

        [Authorize(Roles ="Admin")]
        [HttpDelete]
        [ActionName("delete")]
        public IActionResult DeleteUser(string id)
        {
            if (!_UserService.DeleteUser(id))
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut]
        [ActionName("update")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            User old = _UserService.GetUser(user.Id);
            if (old == null)
            {
                return NotFound();
            }
            else if (!_UserService.UpdateUser(user))
            {
                return NotFound();
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("login")]
        public IActionResult Authentication([FromBody] Login login)
        {
            var user = _UserService.Authentication(login);

            if (user == null)
                return BadRequest();

            return Ok(new
            {
                id = user.Id,
                Username = user.UserName,
                name = user.Name,
                address = user.Address,
                userToken = user.Token
            });
        }
        
        [AllowAnonymous]
        [HttpPost]
        [ActionName("usernameavailability")]
        public IActionResult UserNameAvailability(string userName)
        {
            if (_UserService.CheckUserName(userName))
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}