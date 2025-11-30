import React from "react";
import "../../cssFiles/ContactCenter/ChatReassignedModal.css";

const ChatReassignModal = ({ title, isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-box">
      <p className="modal-message">{title}</p>
      <div className="modal-actions">
        <button className="btn cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn confirm" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChatReassignModal;
