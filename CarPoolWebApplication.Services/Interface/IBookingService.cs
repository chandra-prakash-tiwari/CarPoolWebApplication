using CarPoolingWebApiReact.Models.Client;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IBookingService
    {
        bool Create(Booking booking);

        bool Cancel(string id);

        List<Booking> Status(string id);

        bool Response(string id, BookingStatus status);

        string GetRequesterById(string id);

        List<Booking> GetByUserId(string userId);

        List<Booking> GetAllByRideId(string rideId);

        List<Booking> RequestPending(string rideId);

        Booking GetById(string bookingId);

        List<Booking> GetByRideId(string rideId, string bookerId);
    }
}
