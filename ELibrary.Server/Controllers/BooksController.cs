using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ELibrary.Server.Data;
using ELibrary.Server.Dtos;
using ELibrary.Server.Models;

namespace ELibraryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ELibraryDbContext _context;

        public BooksController(ELibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks(
            string? name = null,
            int? year = null, 
            bool? haveAudiobook = null)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(b => b.Name.Contains(name));
            }

            
            if (year.HasValue)
            {
                query = query.Where(b => b.Year.Year == year.Value);
            }

            if (haveAudiobook.HasValue)
            {
                query = query.Where(b => b.HaveAudiobook == haveAudiobook.Value);
            }

            var result = await query.Select(b => new BookDto
            {
                Id = b.Id,
                Name = b.Name,
                Year = b.Year,
                PictureUrl = b.PictureUrl,
                HaveAudiobook = b.HaveAudiobook
            }).ToListAsync();

            return result;
        }


        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBooks(int id)
        {
            var book = await _context.Books
                .Where(b => b.Id == id)
                .Select(b => new BookDto
            {
                Id = b.Id,
                Name = b.Name,
                Year = b.Year,
                PictureUrl= b.PictureUrl,
                HaveAudiobook = b.HaveAudiobook
            }).FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }
    }
}
