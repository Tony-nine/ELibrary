using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookingBackend.Data;
using BookingBackend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BookingBackend.DTOs;

namespace BookingBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly BookingDbContext _context;

        public BookingsController(BookingDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Room)
                    .ThenInclude(r => r.Hotel)
                .Include(b => b.User)
                .ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var booking = await _context.Bookings
                .Include(b => b.Room)
                    .ThenInclude(r => r.Hotel)
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }


        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(BookingDto bookingRequest)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine(userIdString);
            if (userIdString == null)
            {
                return Unauthorized("User ID claim is missing in the token.");
            }

            if (!int.TryParse(userIdString, out var userId))
            {
                return Unauthorized("User ID claim is invalid.");
            }

            Console.WriteLine(userId);

            var room = await _context.Rooms.FindAsync(bookingRequest.RoomId);
            if (room == null)
            {
                return BadRequest("Invalid room ID.");
            }

            // Check if the check-out date is not before the check-in date
            if (bookingRequest.CheckOutDate <= bookingRequest.CheckInDate)
            {
                return BadRequest("Check-out date must be after check-in date.");
            }

            // Check if the room is already booked for the selected period
            var overlappingBooking = await _context.Bookings
                .Where(b =>
                    b.RoomId == bookingRequest.RoomId &&
                    !(bookingRequest.CheckOutDate <= b.CheckInDate || bookingRequest.CheckInDate >= b.CheckOutDate))
                .FirstOrDefaultAsync();

            if (overlappingBooking != null)
            {
                return BadRequest("The room is already booked for the selected period.");
            }

            var booking = new Booking
            {
                UserId = userId,
                RoomId = bookingRequest.RoomId,
                CheckInDate = bookingRequest.CheckInDate,
                CheckOutDate = bookingRequest.CheckOutDate,
                GuestName = bookingRequest.GuestName,
                GuestEmail = bookingRequest.GuestEmail,
                BreakfastIncluded = bookingRequest.BreakfastIncluded,
                Room = room 
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }

    }
}
