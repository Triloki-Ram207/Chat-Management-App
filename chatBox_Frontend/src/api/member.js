import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const updateMember = async (id, memberData) => {
  const response = await axiosInstance.put(ENDPOINTS.SETTINGS.UPDATE(id), memberData);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await axiosInstance.delete(ENDPOINTS.TEAM.DELETE(id));
  return response.data;
};

export const getAllMembers = async () => {
  const response = await axiosInstance.get(ENDPOINTS.TEAM.GETMEMBER);
  return response.data;
};

export const getMemberById = async () => {
  const response = await axiosInstance.get(ENDPOINTS.SETTINGS.MEMBER);
  return response.data;
};
