import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Star, Wifi, Coffee, Tv, Bath, Users } from "lucide-react";
import { BookingForm } from "../Forms/BookingForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import moment from "moment";

const RoomDetailsCard = ({ room }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    _id,
    name,
    description,
    images,
    price,
    size,
    capacity,
    amenities,
    reviews,
    availability,
  } = room;

  const averageRating = reviews?.length
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      ).toFixed(1)
    : "No ratings yet";

  const handleBookingClick = () => {
    if (!user) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setIsBookingModalOpen(false);
    toast.success("Room booked successfully!");
  };

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardContent className="p-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <img
              src={images[0]}
              alt={name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 col-span-2 gap-2">
            {images.slice(1, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${name} view ${index + 2}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-600">
                    {averageRating} ({reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-lg">
                ${price}/night
              </Badge>
            </div>

            <p className="text-gray-600 mb-6">{description}</p>

            {/* Room Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>Capacity: {capacity} persons</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-gray-500" />
                <span>Size: {size} sq ft</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {amenity.includes("WiFi") && <Wifi className="w-4 h-4" />}
                    {amenity.includes("Coffee") && (
                      <Coffee className="w-4 h-4" />
                    )}
                    {amenity.includes("TV") && <Tv className="w-4 h-4" />}
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Guest Reviews</h3>
              {reviews?.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={review.userImage || "/placeholder-avatar.png"}
                          alt={review.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{review.username}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-4 h-4 ${
                                  index < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">
                          {moment(review.timestamp).format("MMM D, YYYY")}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet for this room.</p>
              )}
            </div>
          </div>

          {/* Booking Section */}
          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">${price}</p>
                  <p className="text-gray-600">per night</p>
                </div>

                <div className="space-y-4">
                  {availability ? (
                    <>
                      <p className="text-green-600 text-center">
                        ✓ Available for booking
                      </p>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleBookingClick}
                      >
                        Book Now
                      </Button>
                    </>
                  ) : (
                    <p className="text-red-600 text-center">
                      Currently unavailable
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Modal */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
              <BookingForm room={room} onSuccess={handleBookingSuccess} />
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setIsBookingModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoomDetailsCard;
