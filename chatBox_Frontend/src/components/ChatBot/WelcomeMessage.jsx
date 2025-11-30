import React, { useRef } from "react";
import "../../cssFiles/ChatBot/WelcomeMessage.css";
import { useSelector } from "react-redux";
import chatBotIcon from "../../assets/ChatBotPage/edit-icon.png";

export default function WelcomeMessage({ setMessage }) {
  const maxWords = 50;
  const { welcomeMsg: message } = useSelector((state) => state.chatBox);

  const inputOneRef = useRef(null);

  const wordCount =
    message.trim() === "" ? 0 : message.trim().split(/\s+/).length;

  return (
    <div className="welcome-container">
      <h3>Welcome Message</h3>
      <div className="message-box">
        <div className="message-header">
          <span className="char-count">
            {wordCount}/{maxWords} words
          </span>
        </div>
        <div className="message-row">
          <textarea
            value={message}
            ref={inputOneRef}
            onChange={(e) => setMessage(e.target.value)}
            className="message-textarea"
            rows={3}
          />
          <span
            className="edit-icon"
            onClick={() => inputOneRef.current?.focus()}
          >
            <img src={chatBotIcon} width={25} alt="editIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}
