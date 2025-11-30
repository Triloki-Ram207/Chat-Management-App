
import mongoose from 'mongoose';
import messageSchema from './messageSchema.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;