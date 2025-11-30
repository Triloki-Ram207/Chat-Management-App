import React, { useState, useEffect,useRef } from "react";
import "../cssFiles/ChatBox.css";
import sendIcon from "../assets/Home/sendIcon.png";
import chatBubbleIcon from "../assets/Home/chatBubbleIcon.png";
import bot from "../assets/Home/bot.png";
import { toast } from "react-hot-toast";
import { addMessage } from "../api/ticket";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTicketsById } from "../api/ticket";

const ChatModal = ({ extraContent, userRegistered, disable = false }) => {
  const [msgArray, setMsgArray] = useState([]);
  const chatBodyRef = useRef(null);

  const { inputColor, backgroundColor, messageOne, messageTwo } = useSelector(
    (state) => state.chatBox
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
  if (chatBodyRef.current) {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }
}, [msgArray]);


  useEffect(() => {
    const fetchTicketMessages = async () => {
      const ticketId = sessionStorage.getItem("ticketId");
      if (!ticketId) return;

      try {
        const response = await getTicketsById({ ticketId });
        console.log("API response:", response);

        if (response?.tickets?.[0]?.messages) {
          setMsgArray(response.tickets[0].messages);
        }
      } catch (error) {
        console.error("Error fetching ticket messages:", error);
        toast.error("Failed to load chat history.");
      }
    };

    fetchTicketMessages();
  }, [dispatch]);

  const onSubmit = async (data) => {
  if (!userRegistered) {
    toast.error("Please fill the form first!");
    return;
  }

  if (!data.message.trim()) {
    toast.error("Message cannot be empty!");
    return;
  }

  const ticketId = sessionStorage.getItem("ticketId");
  if (!ticketId) {
    toast.error("No ticket ID found.");
    return;
  }

  // Optimistic update
  const newMsg = { text: data.message, sender: "user" };
  setMsgArray((prev) => [...prev, newMsg]);
   const registeredUser = JSON.parse(sessionStorage.getItem("registeredUser"));
  try {
    await addMessage({
      text: data.message,
      sender: "user",
      ticketId,
      senderInfo:{
        name: registeredUser.name,
       email: registeredUser.email,
      },
    });
    toast.success("Message sent!");
    reset();

    // Silent re-fetch to sync with server
    const response = await getTicketsById({ ticketId });
    if (response?.tickets?.[0]?.messages) {
      setMsgArray(response.tickets[0].messages);
    }
  } catch (error) {
    toast.error("Failed to send message. Please try again.");
    // Roll back optimistic update if needed
    setMsgArray((prev) => prev.filter((msg) => msg !== newMsg));
  }
};


  return (
    <div className="chat-modal" style={{ backgroundColor: backgroundColor }}>
      <div className="chat-header" style={{ backgroundColor: inputColor }}>
        <img src={chatBubbleIcon} alt="Hubly Logo" className="hubly-logo" />
        <p className="hubly-title">Hubly</p>
      </div>

      <div className="chat-bubble">{messageOne}</div>
      {disable && <div className="chat-bubble">{messageTwo}</div>}

      {!userRegistered ? (
        extraContent
      ) : (
        <>
          {msgArray.length===0 && (
            <div className="chat-bubble">
              Thank You, our team will get back to you soon.
            </div>
          )}
          <div className="chat-body" ref={chatBodyRef}>
            {msgArray &&
  msgArray
    .filter((msg) => ["user", "admin", "member"].includes(msg.sender))
    .map((msg, index) => (
      <div className="chat-bubble" key={index}>
        {msg.sender === "user" && (
          <p className="msg-by-user">{msg.text}</p>
        )}
        {(msg.sender === "admin" || msg.sender === "member") && (
          <p className="msg-by-admin">{msg.text}</p>
        )}
      </div>
    ))}

          </div>
        </>
      )}

      <form className="chat-input" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Write a message"
          {...register("message")}
          disabled={isSubmitting}
          readOnly={disable}
        />
        <button
          type="submit"
          className="send-btn-user"
          disabled={disable || isSubmitting}
        >
          <img src={sendIcon} alt="Send" className="send-icon" />
        </button>
      </form>

      <img src={bot} alt="bot Logo" className="bot-logo" />
    </div>
  );
};

export default ChatModal;
