import "../cssFiles/Home.css";
import hubly from "../assets/Home/hubly.png";
import discussion from "../assets/Home/discussion.png";
import notification from "../assets/Home/notification.png";
import calendar from "../assets/Home/calendar.png";
import sales from "../assets/Home/sales.png";
import frame from "../assets/Home/frame.png";
import feature from "../assets/Home/featureFrame.png";
import feature1 from "../assets/Home/featureFrame1.png";
import StarterPlanCard from "../components/Home/StarterPlanCard";
import FooterCard from "../components/Home/FooterCard";
import footerIcon from "../assets/Home/footer.png";
import playButton from "../assets/Home/playButton.png";
import watchBtn from "../assets/Home/watch-btn-white.png";
import { useNavigate } from "react-router-dom";
import "../cssFiles/chatBox.css";
import ChatContainer from "../components/ChatContainer";
import { useState, useEffect } from "react";
import Form from "../components/ChatBot/Form";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    const ticketId = sessionStorage.getItem("ticketId");
    if (ticketId) {
      setUserRegistered(true);
    }
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src={hubly} alt="hubly" />
        </div>
        <div className="auth-buttons">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn-home"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="btn-home"
          >
            Sign up
          </button>
        </div>
      </header>

      <div className="intro-Container">
        {/* Promo Banner */}
        <div className="promo-content">
          <h1 className="promo-title">
            Grow Your Business Faster with Hubly CRM
          </h1>
          <p className="promo-subtitle">
            Manage leads, automate workflows, and close deals effortlessly—all
            in one powerful platform.
          </p>
          <div className="promo-buttons">
            <button className="get-started-btn">
              Get started <span className="arrow">→</span>
            </button>
            <div className="watch-video-btn">
              <img className="play-icon" src={playButton} alt="Play Button" />{" "}
              <img className="play-icon" src={watchBtn} alt="Play Button" />{" "}
              <span>Watch Video</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <img
            className="discussion-image"
            src={discussion}
            alt="Business discussion"
          />

          <img className="notification" src={notification} alt="Notification" />

          <img className="calendar-widget" src={calendar} alt="Calendar" />

          <img className="sales-widget" src={sales} alt="Sales" />

          <div className="discussion-gradient"></div>
        </div>
      </div>
      <div className="frame">
        <img src={frame} alt="Frame" />
      </div>
      <ChatContainer
        extraContent={<Form setUserRegistered={setUserRegistered} />}
        userRegistered={userRegistered}
        setUserRegistered={setUserRegistered}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="hubly-features">
        <div className="hubly-intro">
          <h2 className="hubly-title">
            At its core, Hubly is a robust CRM solution.
          </h2>
          <p className="hubly-description">
            Hubly helps businesses streamline customer interactions, track
            leads, and automate tasks—saving you time and maximizing revenue.
            Whether you’re a startup or an enterprise, Hubly adapts to your
            needs, giving you the tools to scale efficiently.
          </p>
        </div>

        <div className="hubly-content">
          <div className="hubly-funnel-text">
            <div className="hubly-platforms">
              <h3 className="funnel-heading">MULTIPLE PLATFORMS TOGETHER!</h3>
              <p className="funnel-description">
                Email communication is a breeze with our fully integrated, drag
                & drop email builder.
              </p>
            </div>

            <div className="hubly-close">
              <h3 className="funnel-heading">CLOSE</h3>
              <p className="funnel-description">
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more
              </p>
            </div>

            <div className="hubly-nurture">
              <h3 className="funnel-heading">NURTURE</h3>
              <p className="funnel-description">
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more!
              </p>
            </div>
          </div>

          <div className="hubly-funnel-images">
            <img
              src={feature1}
              alt="Features"
              className="funnel-image feature1"
            />
            <img src={feature} alt="Features" className="funnel-image" />
            <div className="discussion-gradient feature-gradient"></div>
          </div>
        </div>
      </div>

      <div className="plans-section">
        <div className="plans-header">
          <h1 className="plans-title">We have plans for everyone!</h1>
          <p className="plans-subtext">
            We started with a strong foundation, then simply built all of the
            sales and marketing tools ALL businesses need under one platform.
          </p>
        </div>

        <div className="plans-grid">
          <StarterPlanCard
            title="STARTER"
            subtitle="Best for local businesses needing to improve their online reputation."
            price="199"
            features={[
              "Unlimited Users",
              "GMB Messaging",
              "Reputation Management",
              "GMB Call Tracking",
              "24/7 Award Winning Support",
            ]}
            buttonText="SIGN UP FOR STARTER"
          />

          <StarterPlanCard
            title="GROW"
            subtitle="Best for businesses wanting full control of their marketing automation and tracking."
            price="399"
            features={[
              "Pipeline Management",
              "Marketing Automation Campaigns",
              "Live Call Transfer",
              "GMB Messaging",
              "Embed-able Form Builder",
              "Reputation Management",
              "24/7 Award Winning Support",
            ]}
            buttonText="SIGN UP FOR GROW"
          />
        </div>
      </div>
      <div className="footer">
        <div className="footer-logo">
          <img src={hubly} alt="hubly" />
        </div>

        <div className="footer-links">
          <FooterCard
            title="Product"
            items={[
              "Universal checkout",
              "Payment workflows",
              "Observability",
              "UpliftAI",
              "Apps & integrations",
            ]}
          />
          <FooterCard
            title="Why Primer"
            items={[
              "Expand to new markets",
              "Boost payment success",
              "Improve conversion rates",
              "Reduce payments fraud",
              "Recover revenue",
            ]}
          />
          <FooterCard
            title="Developers"
            items={[
              "Primer Docs",
              "API Reference",
              "Payment methods guide",
              "Service status",
              "Community",
            ]}
          />
          <FooterCard
            title="Resources"
            items={["Blog", "Success stories", "News room", "Terms", "Privacy"]}
          />
          <FooterCard title="Company" items={["Careers"]} />
        </div>

        <div className="footer-social">
          <img src={footerIcon} alt="Footer Icon" className="footer-icon" />
        </div>
      </div>
    </div>
  );
}

export default Home;
