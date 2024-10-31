using ELibrary.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace ELibrary.Server.Dtos
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Year { get; set; }
        public string? PictureUrl { get; set; }
        public bool HaveAudiobook { get; set; }
    }
}
