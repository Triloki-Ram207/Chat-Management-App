import React, { useState, useEffect } from "react";
import "../cssFiles/Dashboard.css";
import { getAllTickets } from "../api/ticket";
import sms from "../assets/Dashboard/sms.png";
import sms1 from "../assets/Dashboard/sms1.png";
import searchIcon from "../assets/Dashboard/search.png";
import formatPostedAt from "../utils/timeConversion";

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await getAllTickets();
        const reversedTickets = [...response.tickets].reverse();
        setTickets(reversedTickets);
      } catch (err) {
        setError("No tickets found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  let filteredData = [];
  switch (activeFilter) {
    case "all":
      filteredData = tickets;
      break;
    case "resolved":
      filteredData = tickets.filter((ticket) => ticket.status === "resolved");
      break;
    case "unresolved":
      filteredData = tickets.filter((ticket) => ticket.status === "unresolved");
      break;
    default:
      filteredData = tickets;
  }

  if (searchTerm.trim() !== "") {
    filteredData = filteredData.filter((ticket) =>
      ticket._id.slice(-9).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">Dashboard</div>

      <div className="dashboard-search">
        <img className="searchIcon" src={searchIcon} alt="searchIcon" />
        <input
          type="text"
          placeholder="Search for ticket"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="dashboard-filters">
          <button
            className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            <span className="filter-icon">
              {activeFilter === "all" ? (
                <img src={sms} alt="smsIcon" />
              ) : (
                <img src={sms1} alt="smsIcon" />
              )}
              <span>All Tickets</span>
            </span>
          </button>
          <button
            className={`filter-tab ${
              activeFilter === "resolved" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("resolved")}
          >
            Resolved
          </button>
          <button
            className={`filter-tab ${
              activeFilter === "unresolved" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("unresolved")}
          >
            Unresolved
          </button>
        </div>
        <div className="dashboard-line"></div>
      </div>

      {loading && <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading tickets...</p>
         </div>}
      {error && <p className="ticket-not-found">{error}</p>}
      {searchTerm.trim() !== "" && filteredData.length === 0 && (
        <p className="ticket-not-found">Ticket not found</p>
      )}

      {filteredData.map((ticket) => (
        <div className="dashboard-content" key={ticket._id}>
          <div className="ticket-left">
            <div className="ticket-header">
              <div className="ticket-header1">
                <div className="ticket-avatar"></div>
                <p className="ticket-id">Ticket# {ticket._id.slice(-9)}</p>
              </div>
              <p className="ticket-issue">
                {ticket.status === "resolved"
                  ? "Resolved"
                  : ticket.messages?.length === 1 &&
                    ticket.messages[0]?.sender === "bot"
                  ? "No messages yet"
                  : ticket.messages?.length >= 2 &&
                    ticket.messages.at(-1)?.sender === "bot"
                  ? ticket.messages.at(-2)?.text || "No messages yet"
                  : ticket.messages?.[ticket.messages.length - 1]?.text ||
                    "No messages yet"}
              </p>
            </div>
            <div className="line"></div>

            <div className="ticket-contact">
              <div className="avatar-initials">
                {ticket.userId.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="contact-details">
                <p className="contact-name">{ticket.userId.name}</p>
                <p className="contact-phone">{ticket.userId.phone}</p>
                <p className="contact-email">{ticket.userId.email}</p>
              </div>
            </div>
          </div>

          <div className="ticket-right">
            <div className="ticket-meta">
              <div className="ticket-timestamp">
                {formatPostedAt(
                  ticket.messages?.[ticket.messages.length - 1]?.createdAt
                )}
              </div>
              {/* <div className="ticket-time">55</div> */}
            </div>
            {/* <div className="ticket-action">Open Ticket</div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
