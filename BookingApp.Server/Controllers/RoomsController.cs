using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookingBackend.Data;
using BookingBackend.Models;

namespace BookingBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly BookingDbContext _context;

        public RoomsController(BookingDbContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.Include(r => r.Hotel).ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            //var room = await _context.Rooms.FindAsync(id);
            var room = await _context.Rooms
                             .Include(r => r.Hotel) 
                             .FirstOrDefaultAsync(r => r.Id == id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpGet("Hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetHotelRooms(int hotelId)
        {
            var rooms = await _context.Rooms
                .Where(r => r.HotelId == hotelId)
                .ToListAsync();

            if (rooms == null)
            {
                return NotFound();
            }

            return rooms;
        }
    }
}
