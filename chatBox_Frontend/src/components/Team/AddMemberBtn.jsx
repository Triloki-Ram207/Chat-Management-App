import React from "react";
import "../../cssFiles/Team/Team.css";
import addIcon from "../../assets/Team/add.png";

export default function AddMemberButton({ onClick, disabled }) {
  return (
    <div className="add-member-container">
      <button className="add-member-btn" onClick={onClick} disabled={disabled}>
        <img src={addIcon} alt="Add" className="addIcon" /> Add Team members
      </button>
    </div>
  );
}
