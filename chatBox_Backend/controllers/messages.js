import Ticket from '../models/ticketSchema.js';

export const addMessageToTicket = async (req, res) => {
  try {
    const { ticketId, text, sender,senderInfo } = req.body;
      console.log(senderInfo);
    // Validate required fields
    if (!ticketId || !text || !sender) {
      return res.status(400).json({ message: 'ticketId, text, and sender are required.' });
    }

    // Ensure sender is valid (matches enum in schema)
    const validSenders = ['user', 'bot', 'admin', 'member'];
    if (!validSenders.includes(sender)) {
      return res.status(400).json({ message: 'Invalid sender type.' });
    }

    // Find ticket by MongoDB ObjectId (_id)
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    // Push new message into messages array
    ticket.messages.push({
      text,
      sender,
      senderInfo,
      createdAt: new Date()
    });

    await ticket.save();

    return res.status(200).json({
      message: 'Message added successfully',
      ticket,
      msg:{
        text:text,
        sender:sender,
      },
      senderInfo,
    });
  } catch (error) {
    console.error('Error adding message to ticket:', error);
    return res.status(500).json({ message: 'Server error. Could not add message.' });
  }
};
