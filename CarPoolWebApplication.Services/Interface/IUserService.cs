using CarPoolingWebApiReact.Models.Client;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IUserService
    {
        bool Create(User user);

        User Authenticate(LoginRequest credentials);

        bool Delete(string id);

        bool Update(User newDetails);

        User GetById(string id);

        bool HasUserName(string userName);

        bool HasEmail(string email);
    }
}
