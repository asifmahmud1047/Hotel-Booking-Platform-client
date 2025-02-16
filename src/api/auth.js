import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Sign up new user
export const createUser = async ({ email, password }) => {
  const { data } = await axiosSecure.post("/auth/register", {
    email,
    password,
  });
  return data;
};

// Sign in user
export const signIn = async ({ email, password }) => {
  const { data } = await axiosSecure.post("/auth/login", { email, password });
  return data;
};

// Google sign in
export const signInWithGoogle = async (googleUser) => {
  const { data } = await axiosSecure.post("/auth/google", { googleUser });
  return data;
};

// Sign out user
export const logOut = async () => {
  const { data } = await axiosSecure.post("/auth/logout");
  return data;
};

// Save user info in database
export const saveUser = async (user) => {
  const { data } = await axiosSecure.put(`/users/${user?.email}`, user);
  return data;
};

// Get token from server
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  return data;
};

// Clear token on logout
export const clearToken = async () => {
  const { data } = await axiosSecure.post("/logout");
  return data;
};


