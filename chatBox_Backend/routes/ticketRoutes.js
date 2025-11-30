import express from "express";
import {
  getAllTickets,
  replyToTicket,
  updateTicketStatus,
  getTicketsByMemberId,
  assignChatToMember,
  getAnalytics,
  getTicketById,
} from "../controllers/ticket.js";
import { addMessageToTicket } from "../controllers/messages.js";

const router = express.Router();

router.get("/tickets", getAllTickets);
router.post("/messages", addMessageToTicket);
router.post("/replyToTicket/:ticketId", replyToTicket);
router.put("/updateTicketStatus/:ticketId", updateTicketStatus);
router.get("/ticketsByMemberId/:memberId", getTicketsByMemberId);
router.put("/assignChatToMember/:ticketId", assignChatToMember);
router.get("/analytics", getAnalytics);
router.get("/getTicketById/:ticketId", getTicketById);

export default router;
