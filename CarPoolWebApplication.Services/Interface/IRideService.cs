using CarPoolingWebApiReact.Models.Client;
using System;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IRideService
    {
        bool Create(Ride ride);

        List<Ride> GetOffers(SearchRideRequest booking);

        bool Cancel(string rideId);

        bool OfferResponse(string rideId, string bookingId, BookingStatus status);

        bool Update(Ride updateRide);

        Ride GetById(string id);

        bool IsCarAvailable(string carId, int time, DateTime date);

        List<Ride> GetByOwnerId(string ownerId);
    }
}
