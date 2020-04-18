using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarPoolingWebApiReact.Services.Service
{
    public class BookingService : IBookingService
    {
        private CarPoolContext Db { get; set; }

        public BookingService(CarPoolContext context)
        {
            this.Db = context;
        }

        public bool CreateBooking(Models.Client.Booking booking, string rideId)
        {
            booking.Id = Guid.NewGuid().ToString();
            booking.RideId = rideId;
            this.Db.Bookings.Add(Mapper.Map<Models.Client.Booking, Models.Data.Booking>(booking));

            return this.Db.SaveChanges() > 0;
        }

        public bool CancelRideRequest(string id)
        {
            Models.Data.Booking booking = this.Db.Bookings?.FirstOrDefault(a => a.Id == id);
            if (booking != null && booking.Status == Models.Client.BookingStatus.Pending)
            {
                booking.Status = Models.Client.BookingStatus.Cancel;
                return this.Db.SaveChanges() > 0;
            }

            return false;
        }

        public List<Models.Client.Booking> BookingsStatus(string id)
        {
            return Mapper.Map<List<Models.Data.Booking>, List<Models.Client.Booking>>(this.Db.Bookings?.Where(a => a.BookerId == id && a.Status != Models.Client.BookingStatus.Completed).ToList());
        }

        public bool BookingResponse(string id, Models.Client.BookingStatus status)
        {
            Models.Data.Booking bookingResponse = this.Db.Bookings?.FirstOrDefault(booking => booking.Id == id);
            if (bookingResponse == null)
            {
                return false;
            }

            bookingResponse.Status = status;

            return this.Db.SaveChanges() > 0;
        }

        public string GetRequester(string id)
        {
            return this.Db.Bookings?.FirstOrDefault(a => a.Id == id).RideId;
        }

        public List<Models.Client.Booking> GetUserBookings(string userId)
        {
            return Mapper.Map<List<Models.Data.Booking>, List<Models.Client.Booking>>(this.Db.Bookings?.Where(booking => booking.BookerId == userId).ToList());
        }

        public List<Models.Client.Booking> GetBookings(string rideId)
        {
            return Mapper.Map<List<Models.Data.Booking>, List<Models.Client.Booking>>(this.Db.Bookings?.Where(booking => booking.RideId == rideId).ToList());
        }

        public List<Models.Client.Booking> GetPendingBookings(string rideId)
        {
            return Mapper.Map<List<Models.Data.Booking>, List<Models.Client.Booking>>(this.Db.Bookings?.Where(booking => booking.Status == Models.Client.BookingStatus.Pending && booking.RideId == rideId).ToList());
        }

        public Models.Client.Booking GetBooking(string bookingId)
        {
            return Mapper.Map<Models.Data.Booking, Models.Client.Booking>(this.Db.Bookings?.FirstOrDefault(booking => booking.Id == bookingId));
        }
    }
}
