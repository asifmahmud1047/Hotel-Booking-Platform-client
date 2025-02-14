import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

// eslint-disable-next-line no-unused-vars, react/prop-types
const BookingForm = ({ room, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        // eslint-disable-next-line react/prop-types
        roomId: room._id,
        userId: user._id,
        bookingDate: selectedDate,
        // eslint-disable-next-line react/prop-types
        price: room.price,
        status: "pending",
      };

      const response = await axios.post("/api/bookings", bookingData);

      if (response.data.success) {
        toast.success("Booking confirmed successfully!");
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold">Book This Room</h3>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Select Booking Date</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Price: ${room.price}/night</p>
        <Button
          onClick={handleBooking}
          disabled={loading || !selectedDate}
          className="w-full"
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};
