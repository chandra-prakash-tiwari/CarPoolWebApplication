using CarPoolingWebApiReact.Models.Client;
using System;
using System.Collections.Generic;


namespace CarPoolingWebApiReact.Models.Data
{
    public class Ride
    {
        public string Id { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public float TotalDistance { get; set; }

        public DateTime TravelDate { get; set; }

        public int AvailableSeats { get; set; }

        public DateTime RideDate { get; set; }

        public float RatePerKM { get; set; }

        public int Time { get; set; }

        public string ViaPoints { get; set; }

        public RideStatus Status { get; set; }

        public string OwnerId { get; set; }

        public string CarId { get; set; }

        public User Owner { get; set; }

        public Car Car { get; set; }

        public ICollection<Booking> Bookings { get; set; }
    }
}
