using CarPoolingWebApiReact.Models.Client;
using CarPoolingWebApiReact.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarPoolWebApi.Controllers
{
    [Authorize]
    [Route("api/ride/[action]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideService _RideServices;

        public RideController(IRideService rideServices)
        {
            _RideServices = rideServices;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody] Ride ride)
        {
            if (ride == null)
                return BadRequest();

            else if (!_RideServices.Create(ride))
            {
                return NoContent();
            }

            return Ok();
        }

        [Authorize(Roles ="Admin")]
        [HttpPut]
        [ActionName("cancel")]
        public IActionResult Cancel(string rideId)
        {
            if(string.IsNullOrEmpty(rideId))

            if (!_RideServices.Cancel(rideId))
            {
                return NoContent();
            }

            return Ok();
        }

        [HttpPut]
        [ActionName("update")]
        public IActionResult Update([FromBody] Ride updateRide,string id)
        {
            updateRide.Id = id;
            if (_RideServices.Update(updateRide))
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            if (id == null)
                return BadRequest();

            Ride ride = _RideServices.GetById(id);
            if (ride == null)
                return NotFound();

            return Ok(ride);
        }

        [HttpGet]
        [ActionName("getallrides")]
        public IActionResult GetOwnerRides(string ownerId)
        {
            if (ownerId == null)
                return BadRequest();

            return Ok(_RideServices.GetByOwnerId(ownerId));
        }

        [HttpPost]
        [ActionName("offers")]
        public IActionResult GetOffers([FromBody] SearchRideRequest booking)
        {
            if (booking == null)
                return BadRequest();

            return Ok(_RideServices.GetOffers(booking));
        }

    }
}