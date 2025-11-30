import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const createUser = async (userData) => {
  const response = await axiosInstance.post(ENDPOINTS.HOME.USER, userData);
  return response.data;
};