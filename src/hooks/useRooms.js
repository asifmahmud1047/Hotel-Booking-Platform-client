import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRooms = (filters = {}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Add filters to params
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.available) params.append("available", filters.available);

      const response = await axiosSecure.get(`/rooms?${params.toString()}`);
      return response.data;
    },
  });

  const getRoomDetails = async (roomId) => {
    try {
      const response = await axiosSecure.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch room details"
      );
    }
  };

  const getFeaturedRooms = async () => {
    try {
      const response = await axiosSecure.get("/rooms/featured");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch featured rooms"
      );
    }
  };

  return {
    rooms,
    isLoading,
    refetch,
    getRoomDetails,
    getFeaturedRooms,
  };
};

export default useRooms;
