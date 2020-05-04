using CarPoolingWebApiReact.Models.Client;

namespace CarPoolingWebApiReact.Services.Interfaces
{
    public interface IUserService
    {
        bool AddNewUser(User user);

        User Authentication(Login credentials);

        bool DeleteUser(string id);

        bool UpdateUser(User newDetails);

        User GetUser(string id);

        bool CheckUserName(string userName);

        bool CheckEmail(string email);
    }
}
