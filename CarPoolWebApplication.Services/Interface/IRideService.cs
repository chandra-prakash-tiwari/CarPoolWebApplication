using CarPoolingWebApiReact.Models.Client;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IRideService
    {
        bool Create(Ride ride);

        List<Ride> GetOffers(SearchRideRequest booking);

        bool Cancel(string rideId);

        bool OfferResponse(string rideId);

        bool Update(Ride newRide);

        Ride GetById(string id);

        List<Ride> GetByOwnerId(string ownerId);
    }
}
