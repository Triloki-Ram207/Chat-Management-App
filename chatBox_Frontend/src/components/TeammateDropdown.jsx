import { useState } from "react";
import "../cssFiles/TeammateDropdown.css";
import dropDownIcon from "../assets/ContactCenter/dropdown.png";

const TeammateDropdown = ({
  teammates,
  setReassignedModal,
  currentUser,
  setSelectedTeammate,
  selectedChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (teammate) => {
    if (currentUser?.role === "admin") {
      setReassignedModal(true);
      setSelectedTeammate(teammate);
    }
    setIsOpen(false);
  };

  return (
    <div className="teammate-dropdown">
      <h4 className="section-title">Teammates</h4>
      <div className="info-field" onClick={toggleDropdown}>
        <div className="avatar-member">
          {`${selectedChat.assignedTo.at(-1)?.firstName} ${
            selectedChat.assignedTo.at(-1)?.lastName
          }`
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </div>
        <input
          type="text"
          value={
            selectedChat.assignedTo.at(-1)?.firstName +
            " " +
            selectedChat.assignedTo.at(-1).lastName
          }
          readOnly
          className="dropdownInput"
        />
        <img className="dropDown-icon" src={dropDownIcon} alt="Dropdown Icon" />
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {teammates.map((teammate, index) => (
            <div
              key={index}
              className="dropdown-item info-field"
              onClick={() => handleSelect(teammate)}
            >
              <div className="avatar-member">
                {`${teammate.firstName + " " + teammate.lastName}`
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <input
                type="text"
                value={teammate.firstName + " " + teammate.lastName}
                readOnly
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeammateDropdown;
