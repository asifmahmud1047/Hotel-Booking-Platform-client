// BookingCard.jsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate } from "@/utils/dateFormatter";
import UpdateBookingModal from "./UpdateBookingModal";
import ReviewForm from "../Forms/ReviewForm";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import moment from "moment";

const BookingCard = ({ booking, onUpdate }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const canCancel = () => {
    const bookingDate = moment(booking.bookingDate);
    const today = moment();
    return bookingDate.diff(today, "days") > 1;
  };

  const handleCancel = async () => {
    if (!canCancel()) {
      toast.error(
        "Booking can only be cancelled at least 1 day before the booking date"
      );
      return;
    }

    try {
      setLoading(true);
      await axiosSecure.delete(`/bookings/${booking._id}`);
      toast.success("Booking cancelled successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={booking.room.image}
          alt={booking.room.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{booking.room.name}</h3>
          <p className="text-gray-600">
            Booking Date: {formatDate(booking.bookingDate)}
          </p>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p
            className={`text-sm ${
              booking.status === "confirmed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {booking.status}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() => setIsUpdateModalOpen(true)}
          disabled={!canCancel()}
        >
          Update Date
        </Button>

        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={loading || !canCancel()}
        >
          {loading ? "Cancelling..." : "Cancel Booking"}
        </Button>

        <Button variant="outline" onClick={() => setIsReviewModalOpen(true)}>
          Write Review
        </Button>
      </div>

      <UpdateBookingModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        booking={booking}
        onUpdate={onUpdate}
      />

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <ReviewForm
              roomId={booking.room._id}
              onSuccess={() => {
                setIsReviewModalOpen(false);
                toast.success("Review submitted successfully");
              }}
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BookingCard;