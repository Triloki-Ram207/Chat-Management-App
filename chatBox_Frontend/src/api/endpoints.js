const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/signup`,
    LOGIN: `${BASE_URL}/login`,
    LOGOUT: `${BASE_URL}/logout`,
    REFRESH: `${BASE_URL}/refresh-token`,
  },
  HOME: {
    USER: `${BASE_URL}/createUser`,
  },
  ANALYTICS: {
    GET: `${BASE_URL}/analytics`,
  },
  SETTINGS: {
    UPDATE: (id) => `${BASE_URL}/updateMember/${id}`,
    MEMBER:(id) => `${BASE_URL}/getMemberById/${id}`,
  },
  TEAM:{
    GETMEMBER:`${BASE_URL}/members`,
    DELETE:(id) => `${BASE_URL}/deleteMember/${id}`,
  },
  TICKET:{
    GET:`${BASE_URL}/tickets`,
    MESSAGES:`${BASE_URL}/messages`,
    REPLY:(ticketId)=>`${BASE_URL}/replyToTicket/${ticketId}`,
    UPDATE:(ticketId)=>`${BASE_URL}/updateTicketStatus/${ticketId}`,
    GETBYMEMBERID:(memberId)=>`${BASE_URL}/ticketsByMemberId/${memberId}`,
    ASSIGNTOMEMBER:(ticketId)=>`${BASE_URL}/assignChatToMember/${ticketId}`,
    GETBYTICKETID: (ticketId) => `${BASE_URL}/getTicketById/${ticketId}`,
  },
  CHATBOT:{
    GET:`${BASE_URL}/getChatBoxUi`,
    PUT:`${BASE_URL}/chatBoxUi`,
  } 
};
