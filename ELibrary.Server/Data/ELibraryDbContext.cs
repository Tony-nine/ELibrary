using Microsoft.EntityFrameworkCore;
using ELibrary.Server.Models;

namespace ELibrary.Server.Data
{
    public class ELibraryDbContext : DbContext
    {
        public ELibraryDbContext(DbContextOptions<ELibraryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
