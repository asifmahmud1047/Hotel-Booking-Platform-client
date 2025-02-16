import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Get all bookings for a user
export const getUserBookings = async (email) => {
  const { data } = await axiosSecure.get(`/bookings/${email}`);
  return data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const { data } = await axiosSecure.post("/bookings", bookingData);
  return data;
};

// Update booking date
export const updateBookingDate = async (bookingId, newDate) => {
  const { data } = await axiosSecure.patch(`/bookings/${bookingId}`, {
    newDate,
  });
  return data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const { data } = await axiosSecure.delete(`/bookings/${bookingId}`);
  return data;
};

// Add review for a booking
export const addReview = async (bookingId, reviewData) => {
  const { data } = await axiosSecure.post(`/reviews/${bookingId}`, reviewData);
  return data;
};

// Check booking availability for a date
export const checkAvailability = async (roomId, date) => {
  const { data } = await axiosSecure.get(
    `/bookings/check-availability/${roomId}`,
    {
      params: { date },
    }
  );
  return data;
};

