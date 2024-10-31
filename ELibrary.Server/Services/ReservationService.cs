using ELibrary.Server.Models;
using ELibrary.Server.Dtos;

namespace ELibrary.Server.Services
{
    public class ReservationService
    {
        public decimal ReservationTotalPrice(ReservationPostDto reservation)
        {
            decimal price = ServiceConstants.SERVICE_FEE;

            if (reservation.Type == BookType.Audiodook) {
                price += (reservation.ReservationEndDate - reservation.ReservationStartDate).Days*ServiceConstants.AUDIOBOOK_PRICE;
            }
            else
            {
                price += (reservation.ReservationEndDate - reservation.ReservationStartDate).Days*ServiceConstants.BOOK_PRICE;
            }
            if (reservation.QuickPickUp)
            {
                price += ServiceConstants.QUICK_PICK_UP;
            }

            if((reservation.ReservationEndDate-reservation.ReservationStartDate).Days > 10)
            {
                price += price*(1-(ServiceConstants.DISCOUNT_FOR_10_DAYS/100));
            }else if((reservation.ReservationEndDate - reservation.ReservationStartDate).Days > 3)
            {
                price += price * (1 - (ServiceConstants.DISCOUNT_FOR_3_DAYS / 100));
            }

            return price;
        }
    }
}
