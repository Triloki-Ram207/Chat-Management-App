import mongoose from 'mongoose';

const chatBoxSchema = new mongoose.Schema(
  {
    inputColor: {
      type: String,
      default: '#33475B',
      trim: true,
    },
    backgroundColor: {
      type: String,
      default: '#EEEEEE',
      trim: true,
    },
    messageOne: {
      type: String,
      default: 'How can I help you?',
      trim: true,
    },
     messageTwo: {
      type: String,
      default: 'How can I help you?',
      trim: true,
    },
    welcomeMsg: {
      type: String,
      default: `👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.`,
      trim: true,
    },
    missedChatTimer: {
      type: Number,
      default: 10,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model('ChatBox', chatBoxSchema);
