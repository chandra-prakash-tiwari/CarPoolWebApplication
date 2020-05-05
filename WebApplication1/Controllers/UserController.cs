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
        [ActionName("getbyid")]
        public IActionResult GetUser(string id)
        {
            if (id == null)
                return BadRequest();

            User user = _UserService.GetById(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody] User user)
        {
            if (user == null)
            {
                return NoContent();
            }
            else if (!_UserService.Create(user))
            {
                return Ok(user);
            }

            return BadRequest();
        }

        [Authorize(Roles ="Admin")]
        [HttpDelete]
        [ActionName("delete")]
        public IActionResult Delete(string id)
        {
            if (!_UserService.Delete(id))
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut]
        [ActionName("update")]
        public IActionResult Update([FromBody] User user)
        {
            if (user == null)
                return BadRequest();

            User old = _UserService.GetById(user.Id);
            if (old == null)
                return NoContent();

            else if (!_UserService.Update(user))
            {
                return NotFound();
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("authenticate")]
        public IActionResult Authenticate([FromBody] LoginRequest login)
        {
            if (login == null)
                return BadRequest();

            var user = _UserService.Authenticate(login);
            if (user == null)
                return NoContent();

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
        [HttpGet]
        [ActionName("hasusername")]
        public bool HasUserName(string userName)
        {
            return !(_UserService.HasUserName(userName));
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("hasemail")]
        public bool HasEmail(string email)
        {
            return !_UserService.HasEmail(email);
        }
    }
}