import React from "react";
import chatIcon from "../assets/Home/chatIcon.png";
import "../cssFiles/ChatBox.css";
import ChatModal from "./ChatModal";
import closeModal from "../assets/Home/closeModal.png";
import ChatBotBox from "./ChatBot/ChatBotBox";

function ChatContainer({
  showModal,
  setShowModal,
  setUserRegistered,
  userRegistered,
  extraContent,
}) {
  return (
    <div className="chat-container1">
      {showModal === false && userRegistered === false ? (
        <ChatBotBox />
      ) : (
        <ChatModal
          userRegistered={userRegistered}
          extraContent={extraContent}
        />
      )}
      {showModal === true || userRegistered===true ?  (
        <img
          onClick={() => {
            setShowModal(false);
            setUserRegistered(false);
            sessionStorage.removeItem("ticketId");
          }}
          src={closeModal}
          alt="close Icon"
          className="chat-icon"
        />
      ) : (
        <img
          onClick={() => {
            setShowModal(true);
          }}
          src={chatIcon}
          alt="Chat Icon"
          className="chat-icon"
        />
      )}
    </div>
  );
}

export default ChatContainer;
