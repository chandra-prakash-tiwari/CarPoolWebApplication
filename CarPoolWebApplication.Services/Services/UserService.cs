using AutoMapper;
using CarPoolingWebApiReact.Context;
using CarPoolingWebApiReact.Services.Interfaces;
using CarPoolWebApiReact.Models.Client;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace CarPoolingWebApiReact.Services.Service
{
    public class UserService : IUserService
    {
        private readonly CarPoolContext _db; 
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public UserService(CarPoolContext context, IOptions<AppSettings> appSettings,IMapper mapper)
        {
            _db = context;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public bool AddNewUser(Models.Client.User user)
        {
            user.Id = Guid.NewGuid().ToString();
            var userData = _mapper.Map<Models.Data.User>(user);
            _db.Users.Add(userData);
            return _db.SaveChanges() > 0;
        }

        public Models.Client.User Authentication(Models.Client.Login credentials)
        {
            var user = _mapper.Map<Models.Client.User>(_db.Users.FirstOrDefault(a => (a.UserName == credentials.UserName || a.Email == credentials.UserName) && a.Password == credentials.Password));

            if (user == null)
                return null;

            var role = user.Role== Models.Client.UserType.Admin?"Admin":"User";

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role,role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            return user;
        }

        public bool DeleteUser(string id)
        {
            var user = _db.Users.FirstOrDefault(a => a.Id == id);

            if (user != null)
            {
                _db.Users.Remove(user);
                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public bool UpdateUser(Models.Client.User newDetails)
        {
            Models.Data.User oldDetails = _db.Users.FirstOrDefault(a => a.Id == newDetails.Id);
            if (oldDetails != null)
            {
                oldDetails.Name = newDetails.Name;
                oldDetails.Address = newDetails.Address;
                oldDetails.Mobile = newDetails.Mobile;

                return _db.SaveChanges() > 0;
            }

            return false;
        }

        public Models.Client.User GetUser(string id)
        {
            return _mapper.Map<Models.Client.User>(_db.Users.FirstOrDefault(a => a.Id == id));
        }

        public bool CheckUserName(string userName)
        {
            return _db.Users.FirstOrDefault(a => a.UserName == userName) != null;
        }
    }
}
