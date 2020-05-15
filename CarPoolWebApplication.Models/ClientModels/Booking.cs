using System;
using System.ComponentModel.DataAnnotations;

namespace CarPoolingWebApiReact.Models.Client
{
    public class Booking
    {
        public string Id { get; set; }

        public string RideId { get; set; }

        public string BookerId { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public float TravellingDistance { get; set; }

        public int NoofSeats { get; set; }

        public DateTime BookingDate { get; set; }

        public DateTime TravelDate { get; set; }

        public BookingStatus Status { get; set; }
    }

    public class SearchRideRequest
    {
        [Required(ErrorMessage = "Please enter source city name")]
        public string From { get; set; }

        [Required(ErrorMessage = "Please enter destination city name")]
        public string To { get; set; }

        [Required(ErrorMessage = "Please enter date")]
        public DateTime TravelDate { get; set; }
    }
}
