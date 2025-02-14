import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../Shared/Container";
import { Star } from "lucide-react";
import axiosSecure from "../../api/axiosSecure";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const { data } = await axiosSecure.get("/rooms/featured");
        setRooms(data);
      } catch (error) {
        console.error("Error fetching featured rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-96"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Rooms
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and luxurious accommodations, carefully
            selected to ensure an unforgettable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Link
              key={room._id}
              to={`/rooms/${room._id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl 
                transition-shadow group"
            >
              <div className="relative h-64">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 
                    transition-transform duration-300"
                />
                <div
                  className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full
                  flex items-center gap-1"
                >
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span className="font-semibold">{room.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {room.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${room.price}
                    </span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg
                    hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedRooms;
