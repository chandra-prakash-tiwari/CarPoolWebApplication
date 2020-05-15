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
        private readonly ICarService _carServices;

        public CarController(ICarService carServices)
        {
            this._carServices = carServices;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody] Car car,string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId) || car == null)
                return BadRequest();

            car.OwnerId = ownerId;
            if (!this._carServices.Create(car))
                return NotFound();

            return Ok();
        }

        [HttpDelete]
        [ActionName("delete")]
        public IActionResult Remove(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            if (!this._carServices.Delete(id))
                return NotFound();

            return Ok();
        }

        [HttpGet]
        [ActionName("getbyownerid")]
        public IActionResult GetByOwnerId(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return BadRequest();

            return Ok(this._carServices.GetByOwnerId(ownerId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            return Ok(this._carServices.GetById(id));
        }

        [HttpGet]
        [ActionName("hasnumber")]
        public bool HasNumber(string number)
        {
            if (number == null)
                return false;

            return this._carServices.HasCarNumber(number);
        }
    }
}