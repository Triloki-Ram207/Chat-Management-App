import Member from "../models/memberRegister.js";
import bcrypt from "bcrypt";

// Controller: Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password,termsAccepted } = req.body;
    console.log('Signup request body:', req.body);

    // ✅ Basic validation
    if (!firstName || !lastName || !email || !password || !termsAccepted) {
      return res.status(400).json({ success:false, message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await Member.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success:false, message: "Email already exists" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    const newMember = new Member({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      termsAccepted,
    });

    await newMember.save();

    res.status(201).json({
      message: "Account created successfully",
      success:true,
        member: {
        id: newMember._id,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        email: newMember.email,
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ success:false, message: "Server error" });
  }
};
