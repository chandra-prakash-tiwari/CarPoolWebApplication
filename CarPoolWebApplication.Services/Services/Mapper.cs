using AutoMapper;
using System;
using System.Collections.Generic;

namespace CarPoolingWebApiReact.Services.Service
{
    class Mapper
    {
        private static MapperConfiguration Config { get; set; }

        public static TDesc Map<TSrc, TDesc>(TSrc data)
        {
            Config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TSrc, TDesc>();
            });

            return Config.CreateMapper().Map<TSrc, TDesc>(data);
        }


    }

    class ListMapper
    {
        public static MapperConfiguration Config { get; private set; }

        public static List<TDesc> Map<TSrc, TDesc>(List<TSrc> data)
        {
            Config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TSrc, TDesc>();
            });

            return Config.CreateMapper().Map<List<TSrc>, List<TDesc>>(data);
        }
    }
}
