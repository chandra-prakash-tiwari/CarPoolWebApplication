using AutoMapper;

namespace CarPoolWebApplication.Services.Services
{
    class AutoMapper:Profile
    {
        public AutoMapper()
        {
            CreateMap<CarPoolingWebApiReact.Models.Client.User, CarPoolingWebApiReact.Models.Data.User>();

            CreateMap<CarPoolingWebApiReact.Models.Data.User, CarPoolingWebApiReact.Models.Client.User>();

            CreateMap<CarPoolingWebApiReact.Models.Client.Car, CarPoolingWebApiReact.Models.Data.Car>();

            CreateMap<CarPoolingWebApiReact.Models.Data.Car, CarPoolingWebApiReact.Models.Client.Car>();

            CreateMap<CarPoolingWebApiReact.Models.Client.Ride, CarPoolingWebApiReact.Models.Data.Ride>();

            CreateMap<CarPoolingWebApiReact.Models.Data.Ride, CarPoolingWebApiReact.Models.Client.Ride>();

            CreateMap<CarPoolingWebApiReact.Models.Client.Booking, CarPoolingWebApiReact.Models.Data.Booking>();

            CreateMap<CarPoolingWebApiReact.Models.Data.Booking, CarPoolingWebApiReact.Models.Client.Booking>();
        }
    }
}
