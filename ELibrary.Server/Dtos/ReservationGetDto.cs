using ELibrary.Server.Models;

namespace ELibrary.Server.Dtos
{
    public class ReservationGetDto
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime ReservationStartDate { get; set; }
        public DateTime ReservationEndDate { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? BookName { get; set; }
        public string? BookYear { get; set; }
        public BookType Type { get; set; }
        public bool QuickPickUp { get; set; }
        public decimal TotalPrice { get; set; }
    }   
}
