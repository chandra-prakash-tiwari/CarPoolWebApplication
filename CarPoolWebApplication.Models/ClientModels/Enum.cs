
namespace CarPoolingWebApiReact.Models.Client
{
    public enum BookingStatus
    {
        Confirm = 1,
        Rejected,
        Pending,
        Completed,
        Cancel
    };

    public enum UserType
    {
        User,
        Admin
    }

    public enum RideStatus
    {
        Active,
        Cancel,
        Completed,
        SeatFull
    }
}

