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
        private readonly IRideService _rideServices;

        public RideController(IRideService rideServices)
        {
            this._rideServices = rideServices;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody] Ride ride)
        {
            if (ride == null)
                return BadRequest();

            else if (!this._rideServices.Create(ride))
            {
                return NoContent();
            }

            return Ok();
        }

        [HttpGet]
        [ActionName("response")]
        public bool RideResponse(string rideId, string bookingId, BookingStatus status)
        {
            if (!this._rideServices.OfferResponse(rideId, bookingId, status))
                return false;

            return true;
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            Ride ride = this._rideServices.GetById(id);
            if (ride == null)
                return NotFound();

            return Ok(ride);
        }

        [HttpGet]
        [ActionName("getallrides")]
        public IActionResult GetOwnerRides(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return BadRequest();

            return Ok(this._rideServices.GetByOwnerId(ownerId));
        }

        [HttpPost]
        [ActionName("offers")]
        public IActionResult GetOffers([FromBody] SearchRideRequest booking)
        {
            if (booking == null)
                return BadRequest();

            return Ok(this._rideServices.GetOffers(booking));
        }

    }
}