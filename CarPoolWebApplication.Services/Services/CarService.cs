using AutoMapper;
using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarPoolingWebApiReact.Services.Services
{
    public class CarService : ICarService
    {
        private readonly CarPoolContext _db;
        private readonly IMapper _mapper;

        public CarService(CarPoolContext context, IMapper mapper)
        {
            this._db = context;
            this._mapper = mapper;
        }

        public bool Create(Models.Client.Car car)
        {
            if (car.OwnerId != null && car != null)
            {
                car.Id = Extensions.GenerateId();
                this._db.Cars.Add(this._mapper.Map<Models.Data.Car>(car));                
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public bool Delete(string id)
        {
            var car = this._db.Cars.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Id) && !string.IsNullOrEmpty(id)) && a.Id == id);
            if (car != null)
            {
                this._db.Cars.Remove(car);
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public List<Models.Client.Car> GetByOwnerId (string ownerId)
        {
            return this._mapper.Map<List<Models.Client.Car>>(this._db.Cars.Where(a => (!string.IsNullOrEmpty(a.OwnerId) && !string.IsNullOrEmpty(ownerId)) && a.OwnerId == ownerId).ToList());
        }

        public Models.Client.Car GetById(string id)
        {
            return this._mapper.Map<Models.Client.Car>(this._db.Cars.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Id) && !string.IsNullOrEmpty(id)) && a.Id == id));
        }

        public bool HasCarNumber(string number)
        {
            return this._db.Cars.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Number) && !string.IsNullOrEmpty(number)) && a.Number == number) != null;
        }
    }
}
