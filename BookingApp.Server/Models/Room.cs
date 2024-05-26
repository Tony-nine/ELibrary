using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BookingBackend.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum RoomType
    {
        Standard,
        Deluxe,
        Suite
    }

    public class Room
    {
        public int Id { get; set; }

        [Required]
        public RoomType Type { get; set; }

        public decimal PricePerNight
        {
            get
            {
                return Type switch
                {
                    RoomType.Standard => 100m,
                    RoomType.Deluxe => 150m,
                    RoomType.Suite => 200m,
                    _ => 0m,
                };
            }
        }

        [Url]
        public string? PictureUrl { get; set; }

        [Required]
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
    }
}
