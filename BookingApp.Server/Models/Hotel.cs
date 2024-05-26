using System.ComponentModel.DataAnnotations;

namespace BookingBackend.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Location { get; set; }
        [Url]
        public string? PictureUrl { get; set; }
        //public List<Room> Rooms { get; set; } = new List<Room>();// Navigation property for related rooms
    }
}
