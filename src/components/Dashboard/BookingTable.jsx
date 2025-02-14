// BookingTable.jsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateFormatter";
import UpdateBookingModal from "./UpdateBookingModal";
import moment from "moment";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

const BookingTable = ({ bookings, onUpdate }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const canCancel = (bookingDate) => {
    return moment(bookingDate).diff(moment(), "days") > 1;
  };

  const handleCancel = async (bookingId, bookingDate) => {
    if (!canCancel(bookingDate)) {
      toast.error(
        "Booking can only be cancelled at least 1 day before the booking date"
      );
      return;
    }

    try {
      setLoading(true);
      await axiosSecure.delete(`/bookings/${bookingId}`);
      toast.success("Booking cancelled successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={booking.room.image}
                    alt={booking.room.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span>{booking.room.name}</span>
                </div>
              </TableCell>
              <TableCell>{formatDate(booking.bookingDate)}</TableCell>
              <TableCell>${booking.price}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                    disabled={!canCancel(booking.bookingDate)}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCancel(booking._id, booking.bookingDate)
                    }
                    disabled={loading || !canCancel(booking.bookingDate)}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateBookingModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onUpdate={() => {
          onUpdate();
          setSelectedBooking(null);
        }}
      />
    </div>
  );
};

export default BookingTable;