import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const  getChatBoxConfig= async () => {
  const response = await axiosInstance.get(ENDPOINTS.CHATBOT.GET);
  return response.data;
};

export const updateChatBoxConfig= async (data) => {
  const response = await axiosInstance.put(ENDPOINTS.CHATBOT.PUT,data);
  return response.data;
};

