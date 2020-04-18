using System.ComponentModel.DataAnnotations;

namespace CarPoolingWebApiReact.Models.Client
{
    public class Login
    {
        [Required(ErrorMessage ="Please Enter UserName")]
        public string UserName { get; set; }

        [Required(ErrorMessage ="Enter Password Password")]
        public string Password { get; set; }
    }
}
