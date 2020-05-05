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
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;

        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetUser(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            User user = this._userService.GetById(id);
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
            else if (!this._userService.Create(user))
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
            if (!this._userService.Delete(id))
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

            User old = this._userService.GetById(user.Id);
            if (old == null)
                return NoContent();

            else if (!this._userService.Update(user))
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

            var user = this._userService.Authenticate(login);
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
            if (string.IsNullOrEmpty(userName))
                return true;

            return !(this._userService.HasUserName(userName));
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("hasemail")]
        public bool HasEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return true;

            return !(this._userService.HasEmail(email));
        }
    }
}