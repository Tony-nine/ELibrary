using BookingBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingBackend.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BookingDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<BookingDbContext>>()))
            {
                // Look for any hotels.
                if (context.Hotels.Any())
                {
                    return;   // DB has been seeded
                }

                // Add Hotels
                var hotel1 = new Hotel { Name = "Hotel A", Location = "City A",
                    PictureUrl = "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=2048x2048&w=is&k=20&c=hKhLRUpl6c1p_6CdUHRLTAR-UEBdR6vml7M5AtCSCL4="
                };
                var hotel2 = new Hotel { Name = "Hotel B", Location = "City B",
                    PictureUrl = "https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg"
                };
                var hotel3 = new Hotel { Name = "Hotel C", Location = "City C",
                    PictureUrl = "https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg"
                };

                context.Hotels.AddRange(hotel1, hotel2, hotel3);
                context.SaveChanges();

                // Add Rooms
                var rooms = new Room[]
                {
                    new Room { Type = RoomType.Standard, HotelId = hotel1.Id, 
                        PictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg/640px-Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg"},
                    new Room { Type = RoomType.Deluxe, HotelId = hotel1.Id,
                        PictureUrl = "https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                    },
                    new Room { Type = RoomType.Suite, HotelId = hotel1.Id,
                        PictureUrl = "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/3/small-living-room-ideas_0_1200.jpg"
                    },
                    new Room { Type = RoomType.Standard, HotelId = hotel2.Id,
                        PictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg/640px-Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg"
                    },
                    new Room { Type = RoomType.Deluxe, HotelId = hotel2.Id,
                        PictureUrl = "https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                    },
                    new Room { Type = RoomType.Suite, HotelId = hotel2.Id, PictureUrl = "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/3/small-living-room-ideas_0_1200.jpg"},
                    new Room { Type = RoomType.Standard, HotelId = hotel3.Id, 
                        PictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg/640px-Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg"},
                    new Room { Type = RoomType.Deluxe, HotelId = hotel3.Id,
                        PictureUrl = "https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"
                    },
                    new Room { Type = RoomType.Suite, HotelId = hotel3.Id, PictureUrl = "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/3/small-living-room-ideas_0_1200.jpg" }
                };

                context.Rooms.AddRange(rooms);
                context.SaveChanges();
            }
        }
    }
}
