import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Get all rooms
export const getAllRooms = async (filters = {}) => {
  const { data } = await axiosSecure.get("/rooms", { params: filters });
  return data;
};

// Get featured rooms
export const getFeaturedRooms = async () => {
  const { data } = await axiosSecure.get("/rooms/featured");
  return data;
};

// Get single room details
export const getRoomDetails = async (roomId) => {
  const { data } = await axiosSecure.get(`/rooms/${roomId}`);
  return data;
};

// Get room reviews
export const getRoomReviews = async (roomId) => {
  const { data } = await axiosSecure.get(`/rooms/${roomId}/reviews`);
  return data;
};

// Filter rooms by price range
export const filterRoomsByPrice = async (minPrice, maxPrice) => {
  const { data } = await axiosSecure.get("/rooms/filter", {
    params: { minPrice, maxPrice },
  });
  return data;
};

// Get special offers and promotions
export const getSpecialOffers = async () => {
  const { data } = await axiosSecure.get("/rooms/special-offers");
  return data;
};

// Axios response interceptor for token handling
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Handle token expiration
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);
