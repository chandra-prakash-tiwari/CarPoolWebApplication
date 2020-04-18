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
        [ActionName("createbooking")]
        public IActionResult CreateBookig([FromBody]Booking booking, string rideId)
        {
            if (booking == null)
            {
                return BadRequest();
            }
            _BookingService.CreateBooking(booking, rideId);
            return Ok();
        }

        [HttpPut]
        [ActionName("cancelbooking")]
        public IActionResult CancelBooking(string id)
        {
            if (!_BookingService.CancelRideRequest(id))
            {
                return BadRequest();
            }

            return Ok(_BookingService.GetBooking(id));
        }

        [HttpGet()]
        [ActionName("booking")]
        public IActionResult UserBooking(string ownerId)
        {
            return Ok(_BookingService.BookingsStatus(ownerId));
        }

        [HttpGet]
        [ActionName("requester")]
        public IActionResult Requester(string id)
        {
            return Ok(_BookingService.GetRequester(id));
        }

        [HttpGet]
        [ActionName("viewbookers")]
        public IActionResult GetAllBookers(string rideId)
        {
            return Ok(_BookingService.GetBooking(rideId));
        }

        [HttpGet]
        [ActionName("userbooking")]
        public IActionResult GetUserBookings(string userId)
        {
            return Ok(_BookingService.GetUserBookings(userId));
        }

        [HttpGet]
        [ActionName("pendingbookings")]
        public IActionResult GetPendingBookings(string rideId)
        {
                return Ok(_BookingService.GetPendingBookings(rideId));
        }

        [HttpGet]
        [ActionName("booking")]
        public IActionResult GetBooking(string bookigId)
        {
            return Ok(_BookingService.GetBooking(bookigId));
        }

        [HttpGet]
        [ActionName("allbookings")]
        public IActionResult GetBooing(string rideId)
        {
                return Ok(_BookingService.GetBookings(rideId));
        }
    }
}