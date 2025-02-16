import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import toast from 'react-hot-toast';

const useBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/bookings/${user.email}`);
      return response.data;
    },
    enabled: !!user,
  });

  const { mutate: createBooking } = useMutation({
    mutationFn: async (bookingData) => {
      const response = await axiosSecure.post('/bookings', bookingData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking created successfully!');
      queryClient.invalidateQueries(['bookings', user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    },
  });

  const { mutate: cancelBooking } = useMutation({
    mutationFn: async (bookingId) => {
      const response = await axiosSecure.delete(`/bookings/${bookingId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking cancelled successfully!');
      queryClient.invalidateQueries(['bookings', user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    },
  });

  const { mutate: updateBooking } = useMutation({
    mutationFn: async ({ bookingId, updatedData }) => {
      const response = await axiosSecure.patch(`/bookings/${bookingId}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking updated successfully!');
      queryClient.invalidateQueries(['bookings', user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    },
  });

  return {
    bookings,
    isLoading,
    refetch,
    createBooking,
    cancelBooking,
    updateBooking,
  };
};

export default useBookings;

