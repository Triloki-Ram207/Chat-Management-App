import mongoose from "mongoose";
const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // prevent duplicate accounts
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    termsAccepted: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone:{
       type: String,
       default: '12345676789',
       required:false,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Member = mongoose.model("Member", memberSchema);

export default Member;