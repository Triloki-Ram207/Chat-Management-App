import React, { useMemo } from "react";
import "../cssFiles/Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import analytics from "../assets/Sidebar/analytics.png";
import chatBot from "../assets/Sidebar/chatBot.png";
import contactCenter from "../assets/Sidebar/contactCenter.png";
import dashboard from "../assets/Sidebar/dashboard.png";
import hubly from "../assets/Sidebar/hubly.png";
import online from "../assets/Sidebar/online.png";
import teams from "../assets/Sidebar/teams.png";
import settings from "../assets/Sidebar/settings.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logoutUser from "../utils/logout";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useMemo(
    () => [
      { path: "", icon: dashboard, name: "Dashboard", showLabel: true },
      {
        path: "contactCenter",
        icon: contactCenter,
        name: "Contact Center",
        showLabel: true,
      },
      {
        path: "analytics",
        icon: analytics,
        name: "Analytics",
        showLabel: false,
      },
      { path: "chatBot", icon: chatBot, name: "Chat Bot", showLabel: false },
      { path: "teams", icon: teams, name: "Team", showLabel: false },
      { path: "settings", icon: settings, name: "Settings", showLabel: false },
    ],
    []
  );

  return (
    <div className="sidebar">
      <img src={hubly} alt="hubly" className="hubly-logo" />
      <div className="sidebar-items">
        {items.map((item, index) => (
          <NavLink to={item.path} key={index} className="navlink-reset">
            <div
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              <div className="sidebar-item-content">
                <img src={item.icon} alt={item.name || `icon-${index}`} />
                <p>{item.name}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <img src={online} alt="online" className="online-logo" />
      <button
        className="logout-button"
        onClick={() => logoutUser(navigate, dispatch)}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
