using CarPoolingWebApiReact.Models.Client;
using CarPoolingWebApiReact.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CarPoolWebApi.Controllers
{
    [Authorize]
    [Route("api/booking/[action]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _BookingService;

        public BookingController(IBookingService bookingService)
        {
            this._BookingService = bookingService;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody]Booking booking, string bookerId)
        {
            if (string.IsNullOrEmpty(bookerId) || booking == null)
                return BadRequest();

            booking.BookerId = bookerId;
            booking.Status = BookingStatus.Pending;
            booking.BookingDate = DateTime.Now;
            if (!this._BookingService.Create(booking))
                return Ok();

            return NoContent();
        }

        [HttpPut]
        [ActionName("cancel")]
        public IActionResult Cancel(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            else if (!this._BookingService.Cancel(id))
                return NoContent();

            return Ok(this._BookingService.GetById(id));
        }

        [HttpGet()]
        [ActionName("getstatusbyownerid")]
        public IActionResult GetStatusByOwnerId(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return BadRequest();

            return Ok(this._BookingService.Status(ownerId));
        }

        [HttpGet]
        [ActionName("getrequesterbyid")]
        public IActionResult Requester(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            return Ok(this._BookingService.GetRequesterById(id));
        }

        [HttpGet]
        [ActionName("getallbyrideid")]
        public IActionResult GetAllByRideId(string rideId)
        {
            if (string.IsNullOrEmpty(rideId))
                return BadRequest();

            return Ok(this._BookingService.GetByRideId(rideId));
        }

        [HttpGet]
        [ActionName("getbyuserid")]
        public IActionResult GetByUserId(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return BadRequest();

            return Ok(this._BookingService.GetByUserId(userId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            return Ok(this._BookingService.GetById(id));
        }
    }
}