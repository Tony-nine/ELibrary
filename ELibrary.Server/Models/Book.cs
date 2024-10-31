using System.ComponentModel.DataAnnotations;

namespace ELibrary.Server.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime Year { get; set; }
        [Url]
        public string? PictureUrl { get; set; }
        [Required]
        public bool HaveAudiobook {get; set;}
    }
}
