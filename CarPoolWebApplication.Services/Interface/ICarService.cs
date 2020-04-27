using CarPoolingWebApiReact.Models.Client;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface ICarService
    {
        bool AddNewCar(Car car);

        bool RemoveCar(string id);

        List<Models.Client.Car> GetOwnerCars(string id);

        Car GetCar(string id);
    }
}
