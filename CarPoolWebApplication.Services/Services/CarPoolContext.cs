using CarPoolingWebApiReact.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace CarPoolingWebApiReact.Context
{
    public class CarPoolContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Ride> Rides { get; set; }

        public DbSet<Car> Cars { get; set; }

        public CarPoolContext(DbContextOptions options) : base(options)
        {
        }
    }
}
