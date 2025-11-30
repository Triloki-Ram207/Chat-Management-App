import React, { useState } from "react";
import bot from "../../assets/Home/bot.png";
import "../../cssFiles/ChatBot/ChatBotBox.css";
import welcomeCloseBtn from "../../assets/Home/welcomeCloseBtn.png";

export default function ChatBotBox({
  welcomeMsg = `👋 Want to chat about Hubly? 
  I'm an chatbot here to help you find your way.`,
}) {
  const [welCloseBtn, setWelCloseBtn] = useState(true);
  return (
    <div className="chat-container">
      {welCloseBtn && (
        <>
          <div className="chat-box">
            <div className="chat-text-mssg">
              <img src={bot} alt="Bot" className="bot-icon" />
              {welcomeMsg}
            </div>
            <img
              onClick={() => {
                setWelCloseBtn(false);
              }}
              className="welcomeCloseBtn"
              src={welcomeCloseBtn}
              alt="closeBtn"
            />
          </div>
        </>
      )}
    </div>
  );
}
