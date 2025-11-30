import cron from 'node-cron';
import Ticket from '../models/ticketSchema.js';
import ChatBox from '../models/settingsSchema.js';

cron.schedule('* * * * *', async () => { // runs every minute
  console.log('Checking tickets for missed chats...');

  const chatBox = await ChatBox.findOne();
  if (!chatBox) return;

  const timerMinutes = chatBox.missedChatTimer || 5;

  // Find tickets still open and not yet marked
  const tickets = await Ticket.find({ status: 'unresolved', missedChat: false });

  for (const ticket of tickets) {
    const deadline = new Date(ticket.createdAt.getTime() + timerMinutes * 60000);

    // Find first reply from admin/member
    const reply = ticket.messages.find(msg =>
      msg.sender === 'admin' || msg.sender === 'member'
    );

    if (!reply && new Date() > deadline) {
      // No reply and deadline passed
      ticket.missedChat = true;
      ticket.messages.push({
        sender: 'bot',
        text: `Replying to missed chat `,
        createdAt: new Date()
      });
      await ticket.save();
    } else if (reply && reply.createdAt > deadline) {
      // Reply exists but after deadline
      ticket.missedChat = true;
      ticket.messages.push({
        sender: 'bot',
        text: `Replying to missed chat `,
        createdAt: new Date()
      });
      await ticket.save();
    }
  }
});
