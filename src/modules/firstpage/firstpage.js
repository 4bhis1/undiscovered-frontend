import React, {useContext} from 'react';
import './firstpage.css'; // For your CSS styling
import {useNavigate} from 'react-router-dom';
import mascot from '../../assets/mascot.svg';
import backGroundImage from '../../assets/Homebackground.png';
import Modal from '@mui/material/Modal';
import MainForm from '../../components/localeSwitcher/Form/Form';
import Chatbot from '../chatbot/chatbot';
import {AuthContext} from '../../context/auth/AuthContext';
import {AiContext} from '../../context/AiContext';

const PlanATrip = props => {
  const {isAuthenticated, navigate} = props;
  const [open, setOpen] = React.useState(false);
  const {isBotClose, setIsBotClose} = useContext(AiContext);
  const handleOpen = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      navigate('/login');
    }
  };
  const handleClose = () => setOpen(false);

  console.log('botIsClosed', isBotClose);
  const handleChatBot = () => {
    if (isBotClose) {
      setIsBotClose(false);
    }
  };
  return (
    <div className="action-buttons">
      <button className="plan-button" onClick={handleOpen}>
        Plan a trip &rarr;
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MainForm handleClose={handleClose} />
      </Modal>
      <button className="discover-button" onClick={handleChatBot}>
        Discover on the go &rarr;
      </button>
    </div>
  );
};

const FirstPage = props => {
  const {
    state: {isAuthenticated},
  } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <Chatbot />
        {/* Main Content */}
        <h1>EXPLORE LIKE THE WORLD ID YOUR OYSTER</h1>
        <PlanATrip isAuthenticated={isAuthenticated} navigate={navigate} />
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <h3>Plan & save with ease</h3>
          <p>
            Bookmark destinations and create your personalized itinerary
            effortlessly.
          </p>
        </div>
        <div className="feature-box">
          <h3>Hassle-free booking</h3>
          <p>
            Book flights, stays, and activities in one place while AI finds the
            best deals.
          </p>
        </div>
        <div className="feature-box">
          <h3>Discover on the go</h3>
          <p>
            Get personalized local recommendations from our AI chatbot, tailored
            to your location and interests.
          </p>
        </div>
        <div className="feature-box">
          <h3>Stay updated</h3>
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
