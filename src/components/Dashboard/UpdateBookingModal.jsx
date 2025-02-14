import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import moment from "moment";

const UpdateBookingModal = ({ isOpen, onClose, booking, onUpdate }) => {
  const [newDate, setNewDate] = useState(
    booking ? new Date(booking.bookingDate) : null
  );
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async () => {
    if (!newDate) {
      toast.error("Please select a new date");
      return;
    }

    // Check if selected date is at least 1 day in the future
    if (moment(newDate).diff(moment(), "days") <= 1) {
      toast.error("Please select a date at least 1 day in the future");
      return;
    }

    try {
      setLoading(true);
      await axiosSecure.patch(`/bookings/${booking._id}`, {
        bookingDate: newDate,
      });

      toast.success("Booking date updated successfully");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to update booking date");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Booking Date</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current Booking Date:</p>
            <p className="font-medium">
              {moment(booking.bookingDate).format("MMMM D, YYYY")}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Select New Date:</p>
            <DatePicker
              selected={newDate}
              onChange={setNewDate}
              minDate={moment().add(1, "days").toDate()}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookingModal;
