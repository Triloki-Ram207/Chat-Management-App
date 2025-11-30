import mongoose from 'mongoose';
import messageSchema from './messageSchema.js';

const ticketSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
   assignedTo: [ {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Member', 
     required: true 
   }
   ]
    ,

    status: {
      type: String,
      enum: ['resolved', 'unresolved'],
      default: 'unresolved'
    },

    messages: [messageSchema],
    
     missedChat:{
    type: Boolean,
    default: false
  },
  },
  

  { timestamps: true } 
);

export default mongoose.model('Ticket', ticketSchema);

