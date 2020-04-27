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
        [ActionName("addnewcar")]
        public IActionResult NewCar([FromBody] Car car,string ownerId)
        {
            car.OwnerId = ownerId;
            if (!_CarServices.AddNewCar(car))
                return BadRequest();
            return Ok();
        }

        [HttpDelete]
        [ActionName("removecar")]
        public IActionResult Remove(string id)
        {
            if (!_CarServices.RemoveCar(id))
                return BadRequest();
            return Ok();
        }

        [HttpGet]
        [ActionName("cars")]
        public IActionResult GetOwnerCars(string ownerId)
        {
            return Ok(_CarServices.GetOwnerCars(ownerId));
        }

        [HttpGet]
        [ActionName("car")]
        public IActionResult Car(string carId)
        {
            return Ok(_CarServices.GetCar(carId));
        }
    }
}