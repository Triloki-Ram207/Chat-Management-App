import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: String,
    required: true,
    enum: ['user', 'bot','admin','member'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  senderInfo:{
   name: String,
   email: String,
  }

}, { _id: true });

export default messageSchema;
