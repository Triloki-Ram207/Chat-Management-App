import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveChatBoxConfig,
} from "../stateManagement/chatBoxSlice";

import HeaderColorPicker from "../components/ChatBot/HeaderColorPicker";
import BackgroundColorPicker from "../components/ChatBot/BackgroundColorPicker";
import MessageCustomizer from "../components/ChatBot/MessageCustomizer";
import Form from "../components/ChatBot/Form";
import WelcomeMessage from "../components/ChatBot/WelcomeMessage";
import MissedChatTimer from "../components/ChatBot/MissedChatTimer";
import ChatModal from "../components/ChatModal";
import ChatBotBox from "../components/ChatBot/ChatBotBox";
import "../cssFiles/ChatBot/ChatBot.css";
import '../App.css'


function ChatBot() {
  const dispatch = useDispatch();
  const {
    inputColor,
    backgroundColor,
    messageOne,
    messageTwo,
    welcomeMsg,
    missedChatTimer,
    loading,
  } = useSelector((state) => state.chatBox);

  if (loading) {
    return (
      <div className="chatBot-container">
        <h3 className="chatBot-heading">ChatBot</h3>
        <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading configs...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="chatBot-container">
      <h3 className="chatBot-heading">ChatBot</h3>
      <div className="chatBot-customization-options">
        <div className="form-formation">
          <ChatModal
            headerColor={inputColor}
            backgroundColor={backgroundColor}
            messageOne={messageOne}
            messageTwo={messageTwo}
            extraContent={
              <Form disable={true} />
            }
            disable={true}
          />
          <div className="welcome-message-box">
            <ChatBotBox welcomeMsg={welcomeMsg} />
          </div>
        </div>

        <div className="pickers-container">
          <HeaderColorPicker
            inputColor={inputColor}
            setInputColor={(color) =>
              dispatch(saveChatBoxConfig({ inputColor: color }))
            }
          />
          <BackgroundColorPicker
            backgroundColor={backgroundColor}
            setBackgroundColor={(color) =>
              dispatch(saveChatBoxConfig({ backgroundColor: color }))
            }
          />
          <MessageCustomizer
            messageOne={messageOne}
            setMessageOne={(msg) =>
              dispatch(saveChatBoxConfig({ messageOne: msg }))
            }
            messageTwo={messageTwo}
            setMessageTwo={(msg) =>
              dispatch(saveChatBoxConfig({ messageTwo: msg }))
            }
          />
          <Form disable={true} />
          <WelcomeMessage
            message={welcomeMsg}
            setMessage={(msg) =>
              dispatch(saveChatBoxConfig({ welcomeMsg: msg }))
            }
          />
          <MissedChatTimer
            missedChatTimer={missedChatTimer}
            setMissedChatTimer={(val) =>
              dispatch(saveChatBoxConfig({ missedChatTimer: val }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
