import React from "react";
import "../../cssFiles/FooterCard.css";

const FooterCard = ({ title, items }) => {
  return (
    <div className="footer-card">
      <h3 className="footer-title">{title}</h3>
      <ul className="footer-list">
        {items.map((item, index) => (
          <li key={index} className="footer-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCard;
