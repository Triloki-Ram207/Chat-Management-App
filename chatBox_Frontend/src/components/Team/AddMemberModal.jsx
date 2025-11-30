// AddMemberModal.jsx
import React from "react";
import { useForm } from "react-hook-form";
import "../../cssFiles/Team/AddMemberModal.css";
import { signupUser } from "../../api/auth";
import toast from "react-hot-toast";

export default function AddMemberModal({ onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response;
    try {
      response = await signupUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.email,
        termsAccepted: true,
        role: data.role.toLowerCase(),
      });
      console.log("Failed to create member:", response);

      if (response.success) {
        toast.success("Member created successfully");
        onSave(response.member);
        onClose();
      } else {
        console.log("Failed to create member:", response);
        toast.error(
          response.message ||
            response?.data?.message ||
            "Failed to create member"
        );
      }
    } catch (err) {
      console.error("Error creating member:", err);
      toast.error(err.response?.data?.message || "Failed to create member");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Team members</h2>
        <p className="modal-description">
          Talk with colleagues in a group chat. Messages in this group are only
          visible to its participants. New teammates may only be invited by the
          administrators.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              placeholder="First name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="error">First name is required</span>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="error">Last name is required</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              placeholder="Email ID"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <span className="error">Valid email is required</span>
            )}
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Designation</label>
            <select {...register("role")}>
              <option value="member">Member</option>
            </select>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
