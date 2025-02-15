import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Shared/Container";
import BookingTable from "../../components/Dashboard/BookingTable";
import UpdateBookingModal from "../../components/Dashboard/UpdateBookingModal";
import PageBanner from "../../components/Shared/PageBanner";
import useBookings from "../../hooks/useBookings";
import Loader from "../../components/Shared/Loader";

const MyBookings = () => {
  const { bookings, loading, error, cancelBooking, updateBooking } =
    useBookings();
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (loading) return <Loader />;
  if (error) return <div>Error loading bookings: {error}</div>;

  const handleUpdateDate = (bookingId, newDate) => {
    updateBooking(bookingId, newDate);
    setSelectedBooking(null);
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | Luxury Hotel Booking</title>
      </Helmet>
      <PageBanner title="My Bookings" subtitle="Manage your reservations" />
      <Container>
        <BookingTable
          bookings={bookings}
          onCancel={cancelBooking}
          onUpdate={setSelectedBooking}
        />
        {selectedBooking && (
          <UpdateBookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onUpdate={handleUpdateDate}
          />
        )}
      </Container>
    </>
  );
};

export default MyBookings;
