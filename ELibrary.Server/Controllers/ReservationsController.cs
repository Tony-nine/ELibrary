using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ELibrary.Server.Data;
using ELibrary.Server.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ELibrary.Server.Dtos;
using ELibrary.Server.Services;

namespace ELibraryServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ELibraryDbContext _context;
        private readonly ReservationService _reservationService;

        public ReservationsController(ELibraryDbContext context, ReservationService reservationService)
        {
            _context = context;
            _reservationService = reservationService;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationGetDto>>> GetReservations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            return await _context.Reservations
                .Where(b => b.UserId == userId)
                .Select(b => new ReservationGetDto
                {
                    BookId = b.BookId,
                    UserId = b.UserId,
                    UserName = b.User.Name,
                    UserEmail = b.User.Email,
                    BookName = b.Book.Name,
                    BookYear = b.Book.Year.ToString("yyyy"),
                    Type = b.Type,
                    ReservationStartDate = b.ReservationStartDate,
                    ReservationEndDate = b.ReservationEndDate,
                    QuickPickUp = b.QuickPickUp,
                    TotalPrice = b.TotalPrice
                })
                .ToListAsync();
        }


        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostReservation(ReservationPostDto reservationRequest)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdString == null)
            {
                return Unauthorized("User ID claim is missing in the token.");
            }

            if (!int.TryParse(userIdString, out var userId))
            {
                return Unauthorized("User ID claim is invalid.");
            }

            var book = await _context.Books.FindAsync(reservationRequest.BookId);
            if (book == null)
            {
                return BadRequest("Invalid book ID.");
            }
            var user = await _context.Users.FindAsync(reservationRequest.UserId);
            if (user == null)
            {
                return BadRequest("Invalid user ID.");
            }

            // Check if the end date is not before the start date
            if (reservationRequest.ReservationEndDate <= reservationRequest.ReservationStartDate)
            {
                return BadRequest("End date must be after Start date.");
            }


            var reservation = new Reservation
            {
                UserId = userId,
                BookId = reservationRequest.BookId,
                ReservationStartDate = reservationRequest.ReservationStartDate,
                ReservationEndDate = reservationRequest.ReservationEndDate,
                QuickPickUp = reservationRequest.QuickPickUp,
                Type = reservationRequest.Type,
                Book = book,
                User = user,
                TotalPrice = _reservationService.ReservationTotalPrice(reservationRequest)
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration created successfully" });
        }

    }
}
