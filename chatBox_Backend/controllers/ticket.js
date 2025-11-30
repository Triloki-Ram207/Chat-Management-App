import Ticket from "../models/ticketSchema.js";
import Member from "../models/memberRegister.js";

export const getAllTickets = async (req, res) => {
  try {
    // Fetch all tickets, populate user and assigned member
    const tickets = await Ticket.find()
      .populate("userId", "name email phone") // show basic user info
      .populate("assignedTo", "firstName lastName email role"); // show member info

    return res.status(200).json({
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch tickets." });
  }
};

export const replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { sender, text,senderInfo } = req.body; // sender is a string role: 'user' | 'bot' | 'admin' | 'member'

    if (!text || !sender) {
      return res
        .status(400)
        .json({ error: "Message text and sender required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Construct message according to your schema
    const newMessage = {
      text,
      sender, // must be one of ['user','bot','admin','member']
      senderInfo,
      createdAt: new Date(),
    };

    ticket.messages.push(newMessage);
    await ticket.save();

    res.status(200).json({ message: newMessage, ticketId: ticket._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!["resolved", "unresolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json({ ticketId: ticket._id, status: ticket.status });
  } catch (err) {
    res.status(500).json({ error: "Failed to update ticket status" });
  }
};

export const getTicketsByMemberId = async (req, res) => {
  try {
    const { memberId } = req.params;

    // Use $in to check if memberId exists in the assignedTo array
    const tickets = await Ticket.find({ assignedTo: { $in: [memberId] } })
      .populate("userId", "name email phone") // populate basic user info
      .populate("assignedTo", "firstName lastName email role"); // populate member info

    return res.status(200).json({
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch tickets." });
  }
};

export const assignChatToMember = async (req, res) => {
  try {
    const { ticketId } = req.params; // ticket to update
    const { memberId } = req.body; // member to assign

    // ✅ Validate member existence
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // ✅ Fetch ticket
    const ticket = await Ticket.findById(ticketId)
      .populate("userId", "name email phone")
      .populate("assignedTo", "firstName lastName email role");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // ✅ Business logic
    const adminId = ticket.assignedTo[0]?._id.toString(); // assume index 0 is always admin

    if (memberId === adminId) {
      // Admin assigns to himself → remove index 1 if exists
      ticket.assignedTo = [ticket.assignedTo[0]];
    } else {
      if (ticket.assignedTo.length === 1) {
        // Only admin present → push new member
        ticket.assignedTo.push(memberId);
      } else {
        // Replace index 1 with new member
        ticket.assignedTo[1] = memberId;
      }
    }

    await ticket.save();

    return res.status(200).json({
      message: "Chat reassigned successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error reassigning chat:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not reassign chat." });
  }
};

function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

export const getAnalytics = async (req, res) => {
  try {
    // 1. Total tickets
    const totalTickets = await Ticket.countDocuments();

    // 2. Resolved tickets
    const resolvedTickets = await Ticket.countDocuments({ status: "resolved" });
    const resolvedPercentage =
      totalTickets > 0
        ? ((resolvedTickets / totalTickets) * 100).toFixed(2)
        : 0;

    // 3. Missed tickets per week
    const missedTickets = await Ticket.find({ missedChat: true });
    const missedPerWeek = {};
    missedTickets.forEach((ticket) => {
      const week = getWeekNumber(ticket.createdAt);
      missedPerWeek[week] = (missedPerWeek[week] || 0) + 1;
    });

    // 4. Average reply time
    const tickets = await Ticket.find();
    let totalReplyTime = 0;
    let replyCount = 0;

    tickets.forEach((ticket) => {
      const firstReply = ticket.messages.find(
        (msg) => msg.sender === "admin" || msg.sender === "member"
      );
      if (firstReply) {
        const diff =
          new Date(firstReply.createdAt) - new Date(ticket.createdAt);
        totalReplyTime += diff;
        replyCount++;
      }
    });

    const avgReplyTimeSecs =
      replyCount > 0 ? Math.round(totalReplyTime / replyCount / 1000) : 0;

    // Response
    res.json({
      totalTickets,
      resolvedPercentage,
      missedPerWeek,
      averageReplyTime: `${avgReplyTimeSecs} secs`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching analytics" });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const tickets = await Ticket.find({ _id: ticketId })
      .populate("userId", "name email phone") // populate basic user info
      .populate("assignedTo", "firstName lastName email role"); // populate member info

    return res.status(200).json({
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch tickets." });
  }
};
