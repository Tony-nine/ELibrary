﻿namespace BookingBackend.DTOs
{
    public class BookingDto
    {
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string? GuestName { get; set; }
        public string? GuestEmail { get; set; }
        public bool BreakfastIncluded { get; set; }
    }   
}
