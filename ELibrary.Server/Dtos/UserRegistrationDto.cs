using System.ComponentModel.DataAnnotations;

namespace ELibrary.Server.Dtos
{
    public class UserRegistrationDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
