import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../cssFiles/Settings.css";
import infoIcon from "../assets/Settings/info.png";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../api/member";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateMemberStorage, clearEdit } from "../stateManagement/memberSlice";
import logoutUser from "../utils/logout";

function Settings() {
  const { member, edit, memberToBeEdited } = useSelector(
    (state) => state.member
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: member?.firstName || "",
      lastName: member?.lastName || "",
      email: member?.email || "randomemail08@gmail.com",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    const targetId = edit ? memberToBeEdited._id : member.id;

    let hasChanges =
      data.firstName !==
        (edit ? memberToBeEdited?.firstName : member?.firstName) ||
      data.lastName !==
        (edit ? memberToBeEdited?.lastName : member?.lastName) ||
      data.password;

    if (!hasChanges) {
      toast.success("No changes detected");
      return;
    }

    try {
      setLoading(true);
      const response = await updateMember(targetId, data);
      if (member.id === response.member.id) {
        dispatch(updateMemberStorage(response.member));
      }
      toast.success("Profile updated successfully");
      dispatch(clearEdit());

      const editingSelf = member.id === targetId;
      const isAdmin = member.role === "admin";

      if (data.password) {
        if (!isAdmin && editingSelf) {
          logoutUser(navigate, dispatch);
          toast.success("Password changed. Please login again.");
          navigate("/login");
        } else if (isAdmin && !editingSelf) {
          toast.success("Password changed for member.");
          navigate("/navigation/teams");
        } else if (isAdmin && editingSelf) {
          logoutUser(navigate, dispatch);
          toast.success("Password changed. Please login again.");
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (edit) {
      reset({
        firstName: memberToBeEdited?.firstName || "",
        lastName: memberToBeEdited?.lastName || "",
        email: memberToBeEdited?.email || "",
      });
    }
  }, [edit, memberToBeEdited, reset]);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="edit-profile">
        <h3>Edit Profile</h3>
        <div className="edit-profile-line"></div>
        <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <div className="input-div">
              First Name:
              <input {...register("firstName")} />
            </div>
          </label>

          <label>
            <div className="input-div">
              Last Name:
              <input {...register("lastName")} />
            </div>
          </label>

          <label>
            <div className="input-div">
              Email:
              <input type="email" {...register("email")} readOnly />
            </div>
          </label>

          <label>
            <div className="input-div">
              Password:
              <input
                type="password"
                {...register("password", {
                  validate: (value) =>
                    value === "" ||
                    value.length >= 6 ||
                    "Password must be at least 6 characters",
                })}
              />
            </div>
            <img src={infoIcon} alt="Info" className="info-icon" />
            {password && (
              <span className="logout-warning">
                User will be logged out immediately.
              </span>
            )}
          </label>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <label>
            <div className="input-div">
              Confirm Password:
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    !password || value === password || "Passwords do not match",
                })}
              />
            </div>
            <img src={infoIcon} alt="Info" className="info-icon" />
            {confirmPassword && (
              <span className="logout-warning">
                User will be logged out immediately.
              </span>
            )}
          </label>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}

          <div className="submit-btn-settings">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
