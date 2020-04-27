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
        [ActionName("createride")]
        public IActionResult AddNew([FromBody] Ride ride)
        {
            if (!_RideServices.CreateRide(ride))
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize(Roles ="Admin")]
        [HttpPut]
        [ActionName("cancelride")]
        public IActionResult CancelRide(string rideId)
        {
            if (!_RideServices.CancelRide(rideId))
            {
                return NoContent();
            }

            return Ok();
        }

        [HttpPut]
        [ActionName("modify")]
        public IActionResult Update([FromBody] Ride ride,string id)
        {
            ride.Id = id;
            if (_RideServices.ModifyRide(ride))
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [ActionName("ride")]
        public IActionResult GetRide(string rideId)
        {
            Ride ride = _RideServices.GetRide(rideId);
            if (ride == null)
            {
                return NotFound();
            }

            return Ok(ride);
        }

        [HttpGet]
        [ActionName("yourride")]
        public IActionResult GetOwnerRides(string ownerId)
        {
            return Ok(_RideServices.GetRides(ownerId));
        }

        [HttpPost]
        [ActionName("searchride")]
        public IActionResult GetRidesOffers(SearchRideRequest booking)
        {
            return Ok(_RideServices.GetRidesOffers(booking));
        }

    }
}