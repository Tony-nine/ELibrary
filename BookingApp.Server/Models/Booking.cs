using System;
using System.ComponentModel.DataAnnotations;

namespace BookingBackend.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }
        public Room? Room { get; set; }

        
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        
        public string? GuestName { get; set; }

        
        public string? GuestEmail { get; set; }

        [Required]
        public bool BreakfastIncluded { get; set; }


        public decimal TotalPrice
        {
            get
            {
                if (Room == null)
                {
                    throw new InvalidOperationException("Room information is missing.");
                }
                Console.WriteLine($"CheckInDate: {CheckInDate}, CheckOutDate: {CheckOutDate}, Room: {Room.Type}, PricePerNight: {Room.PricePerNight}");

                TimeSpan numberOfNights = CheckOutDate - CheckInDate;
                decimal basePrice = numberOfNights.Days * Room.PricePerNight;
                decimal cleaningFee = 20m;
                decimal breakfastFee = BreakfastIncluded ? numberOfNights.Days * 15m : 0m;
                return basePrice + cleaningFee + breakfastFee;
            }
        }
    }
}
