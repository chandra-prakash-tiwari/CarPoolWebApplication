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

namespace CarPoolingWebApiReact.Services.Services
{
    public class UserService : IUserService
    {
        private readonly CarPoolContext _db; 
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public UserService(CarPoolContext context, IOptions<AppSettings> appSettings,IMapper mapper)
        {
            this._db = context;
            this._appSettings = appSettings.Value;
            this._mapper = mapper;
        }

        public bool Create(Models.Client.User user)
        {
            user.Id = Extensions.GenerateId();
            this._db.Users.Add(this._mapper.Map<Models.Data.User>(user));
            return this._db.SaveChanges() > 0;
        }

        public Models.Client.User Authenticate(Models.Client.LoginRequest credentials)
        {
            var response = this._db.Users.FirstOrDefault(a => (a.UserName.ToLower() == credentials.UserName.ToLower() || a.Email.ToLower() == credentials.UserName.ToLower()) && a.Password == credentials.Password);
            var user = response!=null ? this._mapper.Map<Models.Client.User>(response):null;

            if (user == null)
                return null;

            var role = user.Role== Models.Client.UserType.Admin?"Admin":"User";

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this._appSettings.Secret);
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

        public bool Delete(string id)
        {
            var user = this._db.Users.FirstOrDefault(a => a.Id == id);

            if (user != null)
            {
                this._db.Users.Remove(user);
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public bool Update(Models.Client.User updateUser)
        {
            Models.Data.User user = this._db.Users.FirstOrDefault(a => a.Id == updateUser.Id);
            if (user != null)
            {
                user.Name = updateUser.Name;
                user.Address = updateUser.Address;
                user.Mobile = updateUser.Mobile;

                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public Models.Client.User GetById(string id)
        {
            return this._mapper.Map<Models.Client.User>(this._db.Users.FirstOrDefault(a => a.Id == id));
        }

        public bool HasUserName(string userName)
        {
            return this._db.Users.FirstOrDefault(a => a.UserName.ToLower() == userName.ToLower()) != null;
        }

        public bool HasEmail(string email)
        {
            return this._db.Users.FirstOrDefault(a => a.Email.ToLower() == email.ToLower()) != null;
        }
    }
}
