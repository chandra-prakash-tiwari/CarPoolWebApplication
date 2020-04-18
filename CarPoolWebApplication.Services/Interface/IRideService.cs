using CarPoolingWebApiReact.Models.Client;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IRideService
    {
        bool CreateRide(Ride ride);

        List<Ride> GetRidesOffers(SearchRideRequest booking);

        bool CancelRide(string rideId);

        bool SeatBookingResponse(string rideId);

        bool ModifyRide(Ride newRide, string id);

        Ride GetRide(string id);

        List<Ride> GetRides(string ownerId);
    }
}
