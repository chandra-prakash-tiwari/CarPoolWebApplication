 using AutoMapper;
using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CarPoolingWebApiReact.Services.Services
{
    public class BookingService : IBookingService
    {
        private readonly CarPoolContext _db;
        private readonly IMapper _mapper;

        public BookingService(CarPoolContext context, IMapper mapper)
        {
            this._db = context;
            this._mapper = mapper;
        }

        public bool Create(Models.Client.Booking booking)
        {
            booking.Id = Extensions.GenerateId();
            this._db.Bookings.Add(this._mapper.Map<Models.Data.Booking>(booking));

            return this._db.SaveChanges() > 0;
        }

        public bool Cancel(string id)
        {
            Models.Data.Booking booking = this._db.Bookings.FirstOrDefault(a => a.Id == id);
            if (booking != null && booking.Status == Models.Client.BookingStatus.Pending)
            {
                booking.Status = Models.Client.BookingStatus.Cancel;
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public List<Models.Client.Booking> Status(string id)
        {
            return this._mapper.Map<List<Models.Client.Booking>>(this._db.Bookings.Where(a => a.BookerId == id && a.Status != Models.Client.BookingStatus.Completed).ToList());
        }

        public bool Response(string id, Models.Client.BookingStatus status)
        {
            var bookingResponse = this._db.Bookings.FirstOrDefault(booking => booking.Id == id);
            if (bookingResponse == null)
            {
                return false;
            }

            bookingResponse.Status = status;

            return this._db.SaveChanges() > 0;
        }

        public string GetRequesterById(string id)
        {
            return this._db.Bookings.FirstOrDefault(a => a.Id == id).RideId;
        }

        public List<Models.Client.Booking> GetByUserId(string userId)
        {
            return this._mapper.Map<List<Models.Client.Booking>>(this._db.Bookings.Where(booking => booking.BookerId == userId).ToList());
        }

        public List<Models.Client.Booking> GetByRideId(string rideId)
        {
            return this._mapper.Map<List<Models.Client.Booking>>(this._db.Bookings.Where(booking => booking.RideId == rideId).ToList());
        }

        public List<Models.Client.Booking> RequestPending(string rideId)
        {
            return this._mapper.Map<List<Models.Client.Booking>>(this._db.Bookings?.Where(booking => booking.Status == Models.Client.BookingStatus.Pending && booking.RideId == rideId).ToList());
        }

        public Models.Client.Booking GetById(string id)
        {
            return this._mapper.Map<Models.Client.Booking>(this._db.Bookings?.FirstOrDefault(booking => booking.Id == id));
        }
    }
}
