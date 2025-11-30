import React from "react";
import "../../cssFiles/StarterPlanCard.css";
import checkIcon from "../../assets/Home/check icon.png";

const StarterPlanCard = ({ title, subtitle, price, features, buttonText }) => {
  return (
    <div className="starter-card">
      <h2 className="starter-title">{title}</h2>
      <p className="starter-subtitle">{subtitle}</p>
      <div className="starter-price">
        ${price} <span>/monthly</span>
      </div>

      <h4 className="starter-includes">What’s included</h4>
      <ul className="starter-features">
        {features.map((feature, index) => (
          <li key={index}>
            <img src={checkIcon} alt="Check Icon" />
            {feature}
          </li>
        ))}
      </ul>

      <button className="starter-button">{buttonText}</button>
    </div>
  );
};

export default StarterPlanCard;
