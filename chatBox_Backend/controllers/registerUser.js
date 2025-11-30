import User from '../models/userSchema.js';
import Ticket from '../models/ticketSchema.js';
import Member from '../models/memberRegister.js';

export const createOrUpdateUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // check if user already exists by email
    let user = await User.findOne({ email });

    if (user) {
      // update name or phone if changed
      let updated = false;

      if (name && user.name !== name) {
        user.name = name;
        updated = true;
      }
      if (phone && user.phone !== phone) {
        user.phone = phone;
        updated = true;
      }

      if (updated) {
        await user.save();
      }
    } else {
      // if user does not exist, create new
      user = new User({ name, phone, email });
      await user.save();
    }

    // 🔑 Find the single admin member
    const adminMember = await Member.findOne({ role: 'admin' });
    if (!adminMember) {
      return res.status(500).json({ message: 'Admin member not found. Please create an admin first.' });
    }

    // Create ticket for both new and updated users
    const newTicket = new Ticket({
      userId: user._id,
     assignedTo: [adminMember._id],
      status: 'unresolved',
    });

    await newTicket.save();

    res.status(201).json({
      message: user.isNew
        ? 'User created successfully and ticket generated!'
        : 'User updated successfully and ticket generated!',
      user,
      ticket: newTicket
    });
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
};
