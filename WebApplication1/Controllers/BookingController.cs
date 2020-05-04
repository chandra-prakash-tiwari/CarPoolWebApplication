using CarPoolingWebApiReact.Models.Client;
using CarPoolingWebApiReact.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            _BookingService = bookingService;
        }

        [HttpPost]
        [ActionName("create")]
        public IActionResult Create([FromBody]Booking booking, string rideId)
        {
            booking.Id = rideId;
            if (!_BookingService.Create(booking))
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        [ActionName("cancel")]
        public IActionResult Cancel(string id)
        {
            if (!_BookingService.Cancel(id))
            {
                return BadRequest();
            }

            return Ok(_BookingService.GetById(id));
        }

        [HttpGet()]
        [ActionName("getstatusbyownerid")]
        public IActionResult GetStatusByOwnerId(string ownerId)
        {
            return Ok(_BookingService.Status(ownerId));
        }

        [HttpGet]
        [ActionName("getrequesterbyid")]
        public IActionResult Requester(string id)
        {
            return Ok(_BookingService.GetRequesterById(id));
        }

        [HttpGet]
        [ActionName("getallbyrideid")]
        public IActionResult GetAllByRideId(string rideId)
        {
            return Ok(_BookingService.GetByRideId(rideId));
        }

        [HttpGet]
        [ActionName("getbyuserid")]
        public IActionResult GetByUserId(string userId)
        {
            return Ok(_BookingService.GetByUserId(userId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            return Ok(_BookingService.GetById(id));
        }
    }
}