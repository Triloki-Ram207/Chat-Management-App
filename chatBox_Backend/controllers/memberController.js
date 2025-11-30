import Member from "../models/memberRegister.js";
import bcrypt from "bcrypt"; // for password comparison & hashing
import Ticket from "../models/ticketSchema.js";

// Controller: Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();

    return res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch members. Please try again later.",
    });
  }
};

// Controller: Get member by id
export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID format",
      });
    }

    // ✅ Fetch member safely, exclude sensitive fields
    const member = await Member.findById(id).select("-password -tokens");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // ✅ Consistent success response
    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err) {
    console.error(`Error fetching member with id ${req.params.id}:`, err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { password: newPassword, ...updates } = req.body;

    // Find member by _id
    const member = await Member.findById(id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    let hasChanges = false;

    // Compare non-password fields
    ["firstName", "lastName", "email"].forEach((field) => {
      if (updates[field] && updates[field] !== member[field]) {
        hasChanges = true;
        member[field] = updates[field];
      }
    });
    // Handle password change
    if (newPassword) {
      const samePassword = await bcrypt.compare(newPassword, member.password);
      if (!samePassword) {
        hasChanges = true;
        member.password = await bcrypt.hash(newPassword, 10);
      }
    }

    if (!hasChanges) {
      return res
        .status(200)
        .json({ success: true, message: "No changes detected", member });
    }

    await member.save();
    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member: {
        id: member._id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        role: member.role,
        user: member.user,
      },
    });
  } catch (err) {
    console.error("Error updating member:", err);

    // Handle duplicate email error
    if (err.code === 11000 && err.keyPattern?.email) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller: Delete member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Delete the member
    const member = await Member.findOneAndDelete({ _id: id });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // ✅ Find all tickets where this member is in assignedTo
    const tickets = await Ticket.find({ assignedTo: id });

    // ✅ Get Admin (assuming you have a way to identify admin, e.g. role === 'admin')
    const admin = await Member.findOne({ role: "admin" });
    if (!admin) {
      return res
        .status(500)
        .json({ message: "Admin not found. Cannot reassign tickets." });
    }

    // ✅ Reassign tickets: keep admin at index 0, remove deleted member
    for (const ticket of tickets) {
      ticket.assignedTo = ticket.assignedTo.filter(
        (assigned) => assigned.toString() !== id.toString()
      );

      // If admin is not already in assignedTo[0], enforce it
      if (
        !ticket.assignedTo.length ||
        ticket.assignedTo[0].toString() !== admin._id.toString()
      ) {
        ticket.assignedTo = [admin._id];
      }

      await ticket.save();
    }

    res.json({
      message: "Member deleted successfully. Tickets reassigned to Admin.",
      reassignedTickets: tickets.length,
    });
  } catch (err) {
    console.error("Error deleting member:", err);
    res.status(500).json({ message: "Server error" });
  }
};
