using System.ComponentModel.DataAnnotations;

namespace CarPoolingWebApiReact.Models.Client
{
    public class LoginRequest
    {
        [Required(ErrorMessage ="Please enter userName")]
        public string UserName { get; set; }

        [Required(ErrorMessage ="Enter password")]
        public string Password { get; set; }
    }
}
