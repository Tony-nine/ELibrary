using ELibrary.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ELibrary.Server.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ELibraryDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ELibraryDbContext>>()))
            {
                // Look for any books.
                if (context.Books.Any())
                {
                    return;   // DB has been seeded
                }

                // Add Books
                var book1 = new Book { Name = "Book A",
                    Year = new DateTime(2024, 1, 1),
                    HaveAudiobook = true,
                    PictureUrl = "https://dictionary.cambridge.org/es/images/thumb/book_noun_001_01679.jpg?version=6.0.36"
                };
                var book2 = new Book { Name = "Book B",
                    Year = new DateTime(2024, 1, 1),
                    HaveAudiobook = true,
                    PictureUrl = "https://dictionary.cambridge.org/es/images/thumb/book_noun_001_01679.jpg?version=6.0.36"
                };
                var book3 = new Book { Name = "Book C",
                    Year = new DateTime(2024, 1, 1),
                    HaveAudiobook = false,
                    PictureUrl = "https://dictionary.cambridge.org/es/images/thumb/book_noun_001_01679.jpg?version=6.0.36"
                };
                

                context.Books.AddRange(book1, book2, book3);
                context.SaveChanges();

                context.SaveChanges();
            }
        }
    }
}
