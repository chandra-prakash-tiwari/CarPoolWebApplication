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
            _db = context;
            _mapper = mapper;
        }

        public bool Create(Models.Client.Car car)
        {
            if (car.OwnerId != null)
            {
                car.Id = Extensions.GenerateId();
                _db.Cars.Add(_mapper.Map<Models.Data.Car>(car));                
                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public bool Delete(string id)
        {
            var car = _db.Cars.FirstOrDefault(a => a.Id == id);
            if (car != null)
            {
                _db.Cars.Remove(car);
                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public List<Models.Client.Car> GetByOwnerId (string ownerId)
        {
            return _mapper.Map<List<Models.Client.Car>>(_db.Cars.Where(a => a.OwnerId == ownerId).ToList());
        }

        public Models.Client.Car GetById(string id)
        {
            return _mapper.Map<Models.Client.Car>(_db.Cars.FirstOrDefault(a => a.Id == id));
        }
    }
}
