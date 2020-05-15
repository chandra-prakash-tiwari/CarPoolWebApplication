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
            if(user == null)
                return false;

            user.Id = Extensions.GenerateId();
            this._db.Users.Add(this._mapper.Map<Models.Data.User>(user));
            return this._db.SaveChanges() > 0;
        }

        public Models.Client.User Authenticate(Models.Client.LoginRequest credentials)
        {
            //var response = new Models.Data.User();
            //try
            //{
            //    response = this._db.Users.FirstOrDefault(a => ((!string.IsNullOrEmpty(credentials.UserName) && (!string.IsNullOrEmpty(a.UserName) &&
            //      a.UserName.Equals(credentials.UserName, StringComparison.InvariantCultureIgnoreCase) || a.Email.Equals(credentials.UserName, StringComparison.InvariantCultureIgnoreCase)
            //      && a.Password == credentials.Password))));
            //}catch(Exception e)
            
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
            var user = this._db.Users.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Id) && !string.IsNullOrEmpty(id)) && a.Id == id);

            if (user != null)
            {
                this._db.Users.Remove(user);
                return this._db.SaveChanges() > 0;
            }

            return false;
        }

        public bool Update(Models.Client.User updateUser)
        {
            if (updateUser == null)
                return false;

            Models.Data.User user = this._db.Users.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Id)) && a.Id == updateUser.Id);
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
            return this._mapper.Map<Models.Client.User>(this._db.Users.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Id) && !string.IsNullOrEmpty(id)) && a.Id == id));
        }

        public bool HasUserName(string userName)
        {
            return this._db.Users.FirstOrDefault(a => (!string.IsNullOrEmpty(a.UserName) && !string.IsNullOrEmpty(userName)) && a.UserName.ToLower() == userName.ToLower()) != null;
        }

        public bool HasEmail(string email)
        {
            return this._db.Users.FirstOrDefault(a => (!string.IsNullOrEmpty(a.Email) && !string.IsNullOrEmpty(email)) && a.Email.ToLower() == email.ToLower()) != null;
        }
    }
}
