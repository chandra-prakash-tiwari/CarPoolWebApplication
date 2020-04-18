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
        private CarPoolContext Db { get; set; }


        private readonly AppSettings _appSettings;

        public UserService(CarPoolContext context, IOptions<AppSettings> appSettings)
        {
            this.Db = context;
            _appSettings = appSettings.Value;
        }

        public bool AddNewUser(Models.Client.User user)
        {
            user.Id = Guid.NewGuid().ToString();
            var userData = Mapper.Map<Models.Client.User, Models.Data.User>(user);
            this.Db.Users.Add(userData);
            return this.Db.SaveChanges() > 0;
        }

        public Models.Client.User Authentication(Models.Client.Login credentials)
        {
            Models.Client.User user = Mapper.Map<Models.Data.User, Models.Client.User>
                (this.Db.Users?.FirstOrDefault(a => (a.UserName==credentials.UserName||a.Email==credentials.UserName)&& a.Password == credentials.Password));

            if (user == null)
                return null;

            var role = "User";
            switch ((Models.Client.UserType)user.Role)
            {
                case Models.Client.UserType.Admin:
                    role = "Admin";
                    break;

                case Models.Client.UserType.User:
                    role = "User";
                    break;

                default:
                    break;
            }

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
            this.Db?.Users?.Remove(this.Db.Users?.FirstOrDefault(a => a.Id == id));
            return this.Db.SaveChanges() > 0;
        }

        public bool UpdateUser(Models.Client.User newDetails, string id)
        {
            Models.Data.User oldDetails = this.Db?.Users?.FirstOrDefault(a => a.Id == id);
            if (oldDetails != null)
            {
                oldDetails.Name = newDetails.Name;
                oldDetails.Address = newDetails.Address;
                oldDetails.Mobile = newDetails.Mobile;

                return this.Db.SaveChanges() > 0;
            }

            return false;
        }

        public Models.Client.User GetUser(string id)
        {
            return Mapper.Map<Models.Data.User, Models.Client.User>(this.Db.Users?.FirstOrDefault(a => a.Id == id));
        }

        public bool CheckUserName(string userName)
        {
            return this.Db.Users?.FirstOrDefault(a => a.UserName == userName) != null;
        }
    }
}
