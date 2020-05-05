using CarPoolingWebApiReact.Models.Client;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface ICarService
    {
        bool Create(Car car);

        bool Delete(string id);

        List<Car> GetByOwnerId(string ownerId);

        Car GetById(string id);
    }
}
