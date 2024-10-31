using System;
using System.ComponentModel.DataAnnotations;

namespace ELibrary.Server.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        [Required]
        public int BookId { get; set; }
        public Book? Book { get; set; }
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required]
        public DateTime ReservationStartDate { get; set; }
        [Required]
        public DateTime ReservationEndDate { get; set; }
        [Required]
        public bool QuickPickUp { get; set; }
        [Required]
        public BookType Type { get; set; }
        [Required]
        public decimal TotalPrice { get;set; }
    }
}
