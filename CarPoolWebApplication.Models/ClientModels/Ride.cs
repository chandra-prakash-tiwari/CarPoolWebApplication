using System;
using System.ComponentModel.DataAnnotations;

namespace CarPoolingWebApiReact.Models.Client
{
    public class Ride
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Please enter source city name")]
        public string From { get; set; }

        [Required(ErrorMessage = "Please enter designation city name")]
        public string To { get; set; }

        public float TotalDistance { get; set; }

        [Required(ErrorMessage = "Please enter travelling date")]
        public DateTime TravelDate { get; set; }

        [Required(ErrorMessage = "Please enter number of available seats")]
        public int AvailableSeats { get; set; }

        public DateTime RideDate { get; set; }

        public int Time { get; set; }

        [Required(ErrorMessage = "Please enter ride rate")]
        public float RatePerKM { get; set; }

        public string OwnerId { get; set; }

        [Required(ErrorMessage = "Please add car")]
        public string CarId { get; set; }

        public string ViaPoints { get; set; }

        public RideStatus Status { get; set; }
    }
}
