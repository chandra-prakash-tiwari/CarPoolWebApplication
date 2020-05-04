using CarPoolingWebApiReact.Models.Client;
using CarPoolingWebApiReact.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CarPoolWebApi.Controllers
{
    [Authorize]
    [Route("api/car/[action]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _CarServices;

        public CarController(ICarService carServices)
        {
            _CarServices = carServices;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody] Car car,string ownerId)
        {
            car.OwnerId = ownerId;
            if (!_CarServices.Create(car))
                return BadRequest();
            return Ok();
        }

        [HttpDelete]
        [ActionName("delete")]
        public IActionResult Remove(string id)
        {
            if (!_CarServices.Delete(id))
                return BadRequest();
            return Ok();
        }

        [HttpGet]
        [ActionName("getbyownerid")]
        public IActionResult GetByOwnerId(string ownerId)
        {
            return Ok(_CarServices.GetByOwnerId(ownerId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            return Ok(_CarServices.GetById(id));
        }
    }
}