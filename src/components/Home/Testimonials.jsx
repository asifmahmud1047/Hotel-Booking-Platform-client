import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Star } from "lucide-react";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        // Sort reviews by timestamp in descending order
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setReviews(sortedReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return <div className="text-center py-12">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-gray-600">
            Real experiences from our valued guests
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={reviews[currentIndex].userImage}
                  alt={reviews[currentIndex].username}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <div className="flex gap-1 mb-4">
                  {renderStars(reviews[currentIndex].rating)}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{reviews[currentIndex].comment}"
                </p>
                <div>
                  <h4 className="font-semibold text-lg">
                    {reviews[currentIndex].username}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(
                      reviews[currentIndex].timestamp
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
