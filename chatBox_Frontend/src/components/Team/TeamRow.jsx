import React from "react";
import "../../cssFiles/Team/Team.css";
import editIcon from "../../assets/Team/edit.png";
import deleteIcon from "../../assets/Team/delete.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEdit,
  setMemberToBeEdited,
} from "../../stateManagement/memberSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function TeamRow({ member, setDeleteModal, setMemberId }) {
  const { member: loggedInMember } = useSelector((state) => state.member);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = member.firstName + " " + member.lastName;
  const initials = getInitials(name);

  const handleEdit = () => {
    if (loggedInMember.id === member._id) {
      dispatch(setEdit(false));
      navigate("/navigation/settings");
    } else if (loggedInMember.role === "admin") {
      dispatch(setEdit(true));
      dispatch(setMemberToBeEdited(member));
      navigate("/navigation/settings");
    } else {
      toast.error("You can only edit your own profile");
    }
  };
  return (
    <tr>
      <td data-label="Full Name">
        <div className="avatar-name">
          <div className="initials-avatar">{initials}</div>
          {member.firstName} {member.lastName}
        </div>
      </td>
      <td data-label="Phone">{member.phone}</td>
      <td data-label="Email">{member.email}</td>
      <td data-label="Role">{member.role}</td>
      <td data-label="Actions">
        <button onClick={handleEdit} className="action-btn edit">
          <img src={editIcon} alt="Edit" />
        </button>
        <button
          onClick={(e) => {
            setMemberId(member._id);
            const clickX = e.clientX;
            const clickY = e.clientY;
            const modalWidth = 600;
            setDeleteModal({
              open: true,
              position: {
                top: clickY + 10,
                left: clickX - modalWidth / 2,
              },
            });
          }}
          className="action-btn delete"
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </td>
    </tr>
  );
}
