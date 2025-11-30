import React from "react";
import "../cssFiles/ContactCenter.css";
import dashboard from "../assets/Sidebar/dashboard.png";
import submitIcon from "../assets/ContactCenter/contactCenterSubmit.png";
import nameIcon from "../assets/ContactCenter/user.png";
import emailIcon from "../assets/ContactCenter/email.png";
import phoneIcon from "../assets/ContactCenter/contact.png";
import ticketStatusIcon from "../assets/ContactCenter/ticketStatus.png";
import TeammateDropdown from "../components/TeammateDropdown";
import { useState } from "react";
import { useEffect } from "react";
import ChatReassignModal from "../components/ContactCenter/ChatReassignedModal";
import { getTicketsByMemberId } from "../api/ticket";
import { getAllMembers } from "../api/member";
import { replyToTicket } from "../api/ticket";
import { updateTicketStatus } from "../api/ticket";
import { useSelector } from "react-redux";
import { assignChatToMember } from "../api/ticket";
import { toast } from "react-hot-toast";
import { formatDate } from "../utils/timeConversion";
import { useForm } from "react-hook-form";
import dropDownIcon from "../assets/ContactCenter/dropdown.png";
import "../App.css";

function ContactCenter() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const { member } = useSelector((state) => state.member);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await getTicketsByMemberId({ memberId: member.id });
        const reversedTickets = [...response.tickets].reverse();
        setTickets(reversedTickets);
        setSelectedChat(reversedTickets[0]);
      } catch (err) {
        setError("Failed to fetch tickets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [member]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getAllMembers();
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  const [reassignedModal, setReassignedModal] = useState(false);

  const [ticketModal, setTicketModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    if (value === "resolved" || value === "unresolved") {
      setTicketModal(true);
    }
  };

  const onSubmit = async (data) => {
    if (!data.message.trim() || !selectedChat?._id) return;
    try {
      const response = await replyToTicket({
        ticketId: selectedChat._id.toString(),
        sender: "member",
        text: data.message,
        senderInfo: {
          name: member.firstName + " " + member.lastName,
          email: member.email,
        },
      });

      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t._id === selectedChat._id
            ? { ...t, messages: [...t.messages, response.message] }
            : t
        )
      );

      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, response.message],
      }));

      reset();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const [selectedTeammate, setSelectedTeammate] = useState(null);

  return (
    <div className="contact-center-container">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading chats...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="no-chats-found">
          <h1>Chats</h1>

          <p className="unable-to-load-chats">Unable to load chat details</p>
        </div>
      ) : selectedChat ? (
        <>
          <div className="contact-center-main">
            <h3 className="contact-center-header">Contact Center</h3>

            <div className="chats-section">
              <p className="chats-heading">Chats</p>
              <div className="line"></div>

              <div className="all-chats">
                {tickets.map((ticket) => (
                  <div
                    onClick={() => {
                      setSelectedChat(ticket);
                    }}
                    className={`chat-card ${
                      ticket._id === selectedChat._id && "active-chat"
                    }`}
                    key={ticket._id}
                  >
                    <div className="chat-avatar">
                      {ticket.userId?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="chat-info">
                      <p className="chat-label">
                        {selectedChat?.userId?.name || "Unknown"}
                      </p>
                      <div className="chat-preview">
                        {member.role === "admin" &&
                        ticket?.assignedTo.length > 1 ? (
                          <p>no longer access</p>
                        ) : (
                          <>
                            {ticket.messages?.[ticket.messages.length - 1]
                              ?.text || "No messages yet"}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chatBox-container">
            <div className="ticket-bar">
              <span className="ticket-number">
                Ticket# {selectedChat._id?.slice(-9) || "N/A"}
              </span>
              <img src={dashboard} alt="home" className="home-icon" />
            </div>

            <div className="chat-interface">
              <div className="date-divider">
                <div className="line1"></div>
                <div className="date-text">
                  {formatDate(selectedChat.createdAt) || "Unknown date"}
                </div>
                <div className="line1"></div>
              </div>
              <div className="chat-message">
                <div className="chat-avatar">
                  {selectedChat.userId?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="chat-content">
                  <p className="chat-label">{selectedChat.userId.name}</p>
                  <div className="chat-text">
                    {selectedChat.messages.map((msg) => {
                      return msg.sender === "user" ? (
                        <p className="left-side-msg" key={msg._id}>
                          {msg.text}
                        </p>
                      ) : msg.sender === "bot" ? (
                        <p className="replyToMissedChat" key={msg._id}>
                          {msg.text}
                        </p>
                      ) : (
                        <div className="right-side-msg" key={msg._id}>
                          <div className="msgFromAdmin">
                            <div className="AdminNameAndChat">
                              <p className="adminMember-name">
                                {msg.senderInfo.name}
                              </p>
                              <p className="adminMember-msg">{msg.text}</p>
                            </div>

                            <div className="chat-avatar-admin">
                              {msg?.senderInfo?.name
                                ? msg.senderInfo.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .toUpperCase()
                                : "NA"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {selectedChat.status === "resolved" ? (
                <p className="chat-resolved">This chat has been resolved </p>
              ) : member.role === "admin" &&
                selectedChat?.assignedTo.length > 1 ? (
                <p className="no-longer-access">
                  This chat is assigned to new team member. you no longer have
                  access{" "}
                </p>
              ) : (
                <>
                  <form
                    className="chat-input-bar"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <textarea
                      placeholder="type here"
                      className="chat-textarea"
                      rows="4"
                      {...register("message")}
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      className="send-button-chat"
                      disabled={isSubmitting}
                    >
                      <img
                        src={submitIcon}
                        width={25}
                        alt="Submit"
                        className="submit-icon-chat"
                      />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="contact-details-container">
            <div className="user-admin-title">
              <div className="chat-avatar">
                {selectedChat.userId?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <h2 className="contact-name">Chat</h2>
            </div>

            <h4 className="section-title">Details</h4>
            <div className="info-field-chat">
              <img src={nameIcon} className="icon" />
              <p className="userDetails">
                {selectedChat.userId?.name || "N/A"}
              </p>
            </div>
            <div className="info-field-chat">
              <img src={phoneIcon} className="icon" />
              <p className="userDetails">
                {selectedChat.userId?.phone || "N/A"}
              </p>
            </div>
            <div className="info-field-chat">
              <img src={emailIcon} className="icon" />
              <p className="userDetails">
                {selectedChat.userId?.email || "N/A"}
              </p>
            </div>

            <TeammateDropdown
              setReassignedModal={setReassignedModal}
              teammates={teamMembers}
              currentUser={member}
              setSelectedTeammate={setSelectedTeammate}
              selectedChat={selectedChat}
            />

            <div className="info-field">
              <img
                src={ticketStatusIcon}
                className="ticket-icon"
                alt="Ticket Status"
              />
              <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="" disabled hidden>
                  Ticket status
                </option>
                <option value="resolved">Resolved</option>
                <option value="unresolved">Unresolved</option>
              </select>
              <img
                className="dropDown-icon-status"
                width={10}
                src={dropDownIcon}
                alt="Dropdown Icon-status"
              />
            </div>

            {reassignedModal && (
              <div className="control-team-modal">
                <ChatReassignModal
                  title="Chat would be assigned to Different team member."
                  isOpen={reassignedModal}
                  onCancel={() => setReassignedModal(false)}
                  selectedChat={selectedChat}
                  selectedTeammate={selectedTeammate}
                  toast={toast}
                  onConfirm={async () => {
                    console.log(selectedTeammate);
                    console.log(selectedChat);
                    try {
                      console.log(selectedTeammate);
                      console.log(selectedChat);
                      const data = await assignChatToMember({
                        ticketId: selectedChat._id,
                        memberId: selectedTeammate._id,
                      });

                      console.log("Chat reassigned successfully:", data);
                      toast.success("Chat reassigned successfully");
                    } catch (error) {
                      console.error("Error reassigning chat:", error);
                    } finally {
                      setReassignedModal(false);
                    }
                  }}
                />
              </div>
            )}

            {ticketModal && (
              <div className="control-team-modal">
                <ChatReassignModal
                  title="Chat will be closed"
                  isOpen={ticketModal}
                  onCancel={() => setTicketModal(false)}
                  onConfirm={async () => {
                    try {
                      await updateTicketStatus({
                        ticketId: selectedChat._id.toString(),
                        status: selectedStatus,
                      });

                      setSelectedChat((prev) => ({
                        ...prev,
                        status: selectedStatus,
                      }));

                      setTicketModal(false);
                    } catch (err) {
                      console.error("Failed to update ticket status:", err);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No chat selected</p>
      )}
    </div>
  );
}

export default ContactCenter;
