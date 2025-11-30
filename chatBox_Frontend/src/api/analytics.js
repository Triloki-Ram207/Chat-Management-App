import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const fetchAnalytics = async () => {
  const response = await axiosInstance.get(ENDPOINTS.ANALYTICS.GET);
  return response.data;
};
