using AutoMapper;
using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
using Nancy.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarPoolingWebApiReact.Services.Services
{
    public class RideService : IRideService
    {
        private readonly CarPoolContext _db;
        private readonly IBookingService _bookingService;
        private readonly IMapper _mapper;

        public RideService(CarPoolContext context, IBookingService bookingService, IMapper mapper)
        {
            this._db = context;
            this._bookingService = bookingService;
            this._mapper = mapper;
        }

        public bool Create(Models.Client.Ride ride)
        {
            ride.RideDate = DateTime.Now;
            ride.Id = Extensions.GenerateId();
            ride.Status = Models.Client.RideStatus.Active;
            this._db.Rides.Add(this._mapper.Map<Models.Data.Ride>(ride));

            return this._db.SaveChanges() > 0;
        }

        public List<Models.Client.Ride> GetOffers(Models.Client.SearchRideRequest booking)
        {
            //var rides = this._db.Rides.Where(ride => ride.TravelDate == booking.TravelDate && ride.To.ToLower() == booking.To.ToLower() &&ride.From.ToLower() == booking.From.ToLower() && ride.AvailableSeats > 0).ToList();

            var rides = new List<Models.Data.Ride>();
            foreach (var ride in this._db.Rides)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();

                var viaPoints = ser.Deserialize<List<Models.Client.Point>>(ride.ViaPoints);
                var destIndex = viaPoints.IndexOf(viaPoints.FirstOrDefault(a => a.City.ToLower() == booking.To.ToLower()));
                var srcIndex = viaPoints.IndexOf(viaPoints.FirstOrDefault(a => a.City.ToLower() == booking.From.ToLower()));


                if ( destIndex>srcIndex&& ride.TravelDate == booking.TravelDate && ride.AvailableSeats > 0)
                {
                    ride.TotalDistance = 0;
                    for(int i = srcIndex; i < destIndex; i++)
                    {
                        ride.TotalDistance +=
                            (float)DistanceCalculator(double.Parse(viaPoints[i].Lat), double.Parse(viaPoints[i].Lng), double.Parse(viaPoints[i + 1].Lat), double.Parse(viaPoints[i + 1].Lng));
                    }
                    rides.Add(ride);
                }
            }

            return this._mapper.Map<List<Models.Client.Ride>>(rides);
        }

        public double DistanceCalculator(double srcLat,double srcLng, double descLat, double descLng)
        {
            var radiusOverDegress = (Math.PI / 180);
            var srcLatROD = srcLat * radiusOverDegress;
            var srcLngROD = srcLng * radiusOverDegress;
            var descLatROD = descLat * radiusOverDegress;
            var descLngROD = descLng * radiusOverDegress;

            var lngDiff = descLngROD - srcLngROD;
            var latDiff = descLatROD - srcLatROD;

            var result1 = Math.Pow(Math.Sin(latDiff / 2.0), 2.0) +
                          Math.Cos(srcLatROD) * Math.Cos(descLatROD) *
                          Math.Pow(Math.Sin(lngDiff / 2.0), 2.0);

            var result2 = 3956.0 * 2.0 *
                          Math.Atan2(Math.Sqrt(result1), Math.Sqrt(1.0 - result1));

            return result2;
        }

        public bool Cancel(string rideId)
        {
            var ride = this._db.Rides.FirstOrDefault(a => a.Id == rideId);
            if (ride != null && this._bookingService.GetByRideId(rideId).Any())
            {
                ride.Status = Models.Client.RideStatus.Cancel;
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public bool OfferResponse(string rideId, string bookingId, Models.Client.BookingStatus status)
        {
            var ride = this._mapper.Map<Models.Data.Ride>(this.GetById(rideId));
            if (ride.AvailableSeats > 0)
            {
                if (this._bookingService.Response(bookingId, status))
                {
                    ride.AvailableSeats--;
                    return this._db.SaveChanges() > 0;
                }
            }

            return false;
        }

        public bool Update(Models.Client.Ride updateRide)
        {
            var ride = this._mapper.Map<Models.Data.Ride>(this.GetById(updateRide.Id));
            if (ride != null)
            {
                ride.RideDate = updateRide.RideDate;
                ride.From = updateRide.From;
                ride.CarId = updateRide.CarId;
                ride.To = updateRide.To;
            }

            return this._db.SaveChanges() > 0;
        }

        public Models.Client.Ride GetById(string id)
        {
            return this._mapper.Map<Models.Client.Ride>(this._db.Rides.FirstOrDefault(ride => ride.Id == id));
        }

        public List<Models.Client.Ride> GetByOwnerId(string ownerId)
        {
            return this._mapper.Map<List<Models.Client.Ride>>(this._db.Rides.Where(ride => ride.OwnerId == ownerId).ToList());
        }
    }
}
