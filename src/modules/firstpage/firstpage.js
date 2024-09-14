import React from 'react';
import './firstpage.css'; // For your CSS styling
import {useNavigate} from 'react-router-dom';
import mascot from '../../assets/mascot.svg';

const FirstPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <img src={mascot} alt="undiscover logo" />
            <text>undiscover</text>
          </div>
          <div className="login" onClick={() => navigate('/login')}>
            <button className="login-button">Login</button>
          </div>
        </nav>

        {/* Main Content */}
        <h1>Explore like the world is your oyster</h1>
        <div className="action-buttons">
          <button className="plan-button">Plan a trip &rarr;</button>
          <button className="discover-button">Discover on the go &rarr;</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <h3>plan & save with ease</h3>
          <p>
            Bookmark destinations and create your personalized itinerary
            effortlessly.
          </p>
        </div>
        <div className="feature-box">
          <h3>hassle-free booking</h3>
          <p>
            Book flights, stays, and activities in one place while AI finds the
            best deals.
          </p>
        </div>
        <div className="feature-box">
          <h3>discover on the go</h3>
          <p>
            Get personalized local recommendations from our AI chatbot, tailored
            to your location and interests.
          </p>
        </div>
        <div className="feature-box">
          <h3>stay updated</h3>
          <p>
            Receive real-time itinerary alerts and travel notifications for a
            smooth trip.
          </p>
        </div>
      </section>

      {/* Globe Image */}
      <div className="globe">
        <img src={mascot} alt="Globe mascot" />
      </div>
    </div>
  );
};

export default FirstPage;
