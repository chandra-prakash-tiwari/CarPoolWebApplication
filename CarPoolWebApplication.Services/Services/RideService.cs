using AutoMapper;
using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
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
            _db = context;
            _bookingService = bookingService;
            _mapper = mapper;
        }

        public bool Create(Models.Client.Ride ride)
        {
            ride.RideDate = DateTime.Now;
            ride.Id = Extensions.GenerateId();
            ride.Status = Models.Client.RideStatus.Active;
            _db.Rides.Add(_mapper.Map<Models.Data.Ride>(ride));

            return _db.SaveChanges() > 0;
        }

        public List<Models.Client.Ride> GetOffers(Models.Client.SearchRideRequest booking)
        {
            var rides = _db.Rides.Where(ride => ride.TravelDate == booking.TravelDate && (ride.To).Equals(booking.To, StringComparison.InvariantCultureIgnoreCase) &&
                    (ride.From).Equals(booking.From, StringComparison.InvariantCultureIgnoreCase) && ride.AvailableSeats > 0).ToList();

            return _mapper.Map<List<Models.Client.Ride>>(rides);
        }

        public bool Cancel(string rideId)
        {
            var ride = _db.Rides.FirstOrDefault(a => a.Id == rideId);
            if (ride != null && _bookingService.GetByRideId(rideId).Any())
            {
                ride.Status = Models.Client.RideStatus.Cancel;
                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public bool OfferResponse(string rideId)
        {
            var ride = _mapper.Map<Models.Data.Ride>(this.GetById(rideId));
            if (ride.AvailableSeats > 0)
            {
                ride.AvailableSeats--;
                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public bool Update(Models.Client.Ride updateRide)
        {
            var ride = _mapper.Map<Models.Data.Ride>(this.GetById(updateRide.Id));
            if (ride != null)
            {
                ride.RideDate = updateRide.RideDate;
                ride.From = updateRide.From;
                ride.CarId = updateRide.CarId;
                ride.To = updateRide.To;
            }

            return _db.SaveChanges() > 0;
        }

        public Models.Client.Ride GetById(string id)
        {
            return _mapper.Map<Models.Client.Ride>(_db.Rides.FirstOrDefault(ride => ride.Id == id));
        }

        public List<Models.Client.Ride> GetByOwnerId(string ownerId)
        {
            return _mapper.Map<List<Models.Client.Ride>>(_db.Rides.Where(ride => ride.OwnerId == ownerId).ToList());
        }
    }
}
