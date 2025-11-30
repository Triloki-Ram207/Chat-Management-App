import React, { useRef } from "react";
import "../../cssFiles/ChatBot/MessageCustomizer.css";
import chatBotIcon from "../../assets/ChatBotPage/edit-icon.png";

export default function MessageCustomizer({
  messageOne,
  setMessageOne,
  messageTwo,
  setMessageTwo,
}) {
  const inputOneRef = useRef(null);
  const inputTwoRef = useRef(null);
  return (
    <div className="message-customizer-container">
      <h3>Customize Message</h3>
      <div className="message-box">
        <div className="message-row">
          <input
            type="text"
            ref={inputOneRef}
            value={messageOne}
            onChange={(e) => setMessageOne(e.target.value)}
            className="message-input"
          />
          <span
            className="edit-icon"
            onClick={() => inputOneRef.current?.focus()}
          >
            <img src={chatBotIcon} width={25} alt="editIcon" />
          </span>
        </div>
        <div className="message-row">
          <input
            type="text"
            ref={inputTwoRef}
            value={messageTwo}
            onChange={(e) => setMessageTwo(e.target.value)}
            className="message-input"
          />
          <span
            className="edit-icon"
            onClick={() => inputTwoRef.current?.focus()}
          >
            <img src={chatBotIcon} width={25} alt="editIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}
