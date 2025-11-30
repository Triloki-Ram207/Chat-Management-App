import React from "react";
import frame from "../assets/frame.png";
import hubly from "../assets/Home/hubly.png";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../cssFiles/LoginSignup.css";

function LoginSignup({ status }) {
  return (
    <div className="login-signup-wrapper">
      <div className="form-section">
        <img src={hubly} alt="hubly logo" className="logo" />
        <div className="form-container">
          {status === "login" ? <LoginForm /> : <SignupForm />}
        </div>
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the{" "}
          <a href="#">Google Privacy Policy</a> and{" "}
          <a href="#">Terms of Service</a> apply.
        </p>
      </div>

      <div className="image-section">
        <img src={frame} alt="frame illustration" className="frame-image" />
      </div>
    </div>
  );
}

export default LoginSignup;
