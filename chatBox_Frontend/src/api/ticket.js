import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const getAllTickets = async () => {
  const response = await axiosInstance.get(ENDPOINTS.TICKET.GET);
  return response.data;
};

export const addMessage = async (messageData) => {
  const response = await axiosInstance.post(ENDPOINTS.TICKET.MESSAGES, messageData);
  return response.data;
};

export const replyToTicket=async ({ticketId,sender,text,senderInfo}) => {
  const response = await axiosInstance.post(ENDPOINTS.TICKET.REPLY(ticketId), { sender, text ,senderInfo} );
  return response.data;
};

export const updateTicketStatus=async ({ticketId,status}) => {
  const response = await axiosInstance.put(ENDPOINTS.TICKET.UPDATE(ticketId), { status } );
  return response.data;
};

export const getTicketsByMemberId=async ({memberId}) => {
  const response = await axiosInstance.get(ENDPOINTS.TICKET.GETBYMEMBERID(memberId));
  return response.data;
};

export const assignChatToMember=async ({ticketId,memberId}) => {
  const response = await axiosInstance.put(ENDPOINTS.TICKET.ASSIGNTOMEMBER(ticketId), { memberId } );
  return response.data;
};

export const getTicketsById=async ({ticketId}) => {
  const response = await axiosInstance.get(ENDPOINTS.TICKET.GETBYTICKETID(ticketId));
  return response.data;
};