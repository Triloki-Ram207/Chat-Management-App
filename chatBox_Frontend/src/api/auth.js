import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const signupUser = async (userData) => {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.SIGNUP, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};


