import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Summer Getaway Special",
      description:
        "Book 3 nights, get 1 night free! Perfect for your summer vacation.",
      discount: "25% OFF",
      validUntil: "2024-08-31",
      image: "/images/summer-special.jpg",
    },
    {
      id: 2,
      title: "Early Bird Discount",
      description: "Book 30 days in advance and save big on your stay!",
      discount: "15% OFF",
      validUntil: "2024-12-31",
      image: "/images/early-bird.jpg",
    },
  ]);

  useEffect(() => {
    // Show modal on initial page load
    const hasSeenOffers = localStorage.getItem("hasSeenOffers");
    if (!hasSeenOffers) {
      setShowModal(true);
      localStorage.setItem("hasSeenOffers", "true");
    }
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Special Offers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full">
                  {offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Valid until:{" "}
                    {new Date(offer.validUntil).toLocaleDateString()}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <h2 className="text-3xl font-bold text-center mb-6">
                Limited Time Offers!
              </h2>
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {offer.title} - {offer.discount}
                    </h3>
                    <p className="text-gray-600 mt-2">{offer.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Offers
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default SpecialOffers;
