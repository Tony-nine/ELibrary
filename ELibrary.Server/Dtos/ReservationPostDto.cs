using ELibrary.Server.Models;

namespace ELibrary.Server.Dtos
{
    public class ReservationPostDto
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime ReservationStartDate { get; set; }
        public DateTime ReservationEndDate { get; set; }
        public BookType Type { get; set; }
        public bool QuickPickUp { get; set; }
    }
}
