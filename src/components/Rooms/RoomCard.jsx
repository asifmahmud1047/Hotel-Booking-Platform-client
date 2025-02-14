/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

const RoomCard = ({ room }) => {
  const {
    _id,
    name,
    images,
    price,
    capacity,
    description,
    reviews = [],
    size,
    amenities = [],
  } = room;

  const averageRating = reviews.length
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      ).toFixed(1)
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link to={`/rooms/${_id}`} className="block">
        <div className="relative h-64">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">{averageRating}</span>
              <span className="text-gray-500 text-sm">({reviews.length})</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">${price}</span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Up to {capacity} guests</span>
            </div>
            <div className="text-gray-600">{size} sq ft</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-gray-500 text-sm">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RoomCard;
