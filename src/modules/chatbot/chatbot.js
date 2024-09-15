import React, {useState, useEffect, useRef, useContext} from 'react';
import ReactDOM from 'react-dom';
import API from './ChatbotAPI';
import './chatbot.css';
import {FaTimes, FaMinus} from 'react-icons/fa';
import {AuthContext} from '../../context/auth/AuthContext';
import {AiContext} from '../../context/AiContext';
import HttpAuth from '../../services/HttpAuthService';
import {showError} from '../../hooks/showError';

function Header() {
  return <div className="chatbot-header">&nbsp;Chatbot AI</div>;
}

function Input({onSend}) {
  const [text, setText] = useState('');
  const {aidata} = useContext(AiContext);

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const handleSend = async e => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <div className="chatbotInput">
      <form onSubmit={handleSend}>
        <input
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Enter your message here"
        />
        <button>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500">
            <g>
              <g>
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}

function UserMessage({text}) {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
}

function BotMessage({message}) {
  return (
    <div className="message-container">
      <div className="bot-message">{message}</div>
    </div>
  );
}

function Messages({messages}) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({block: 'end', behavior: 'smooth'});
  });
  return (
    <div className="messages">
      {messages}
      <div id={'el'} ref={el} />
    </div>
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const {aidata, updateAiData, isBotClose, setIsBotClose} =
    useContext(AiContext);

  console.log('aidata', isBotClose);
  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([<BotMessage key="0" message="HI" />]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const payload = {message: text};
    console.log('aidata ', aidata);
    if (aidata?.itinerary?._id) {
      payload.itineraryId = aidata?.itinerary?._id;
    }
    try {
      const botMessage = await API.GetChatbotResponse(payload);
      setMessages([
        ...messages,
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage key={messages.length + 2} message={botMessage} />,
      ]);
    } catch (err) {
      showError(err);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(prevState => !prevState);
  };

  const handleClose = () => {
    setIsBotClose(true);
  };

  if (isBotClose) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <Header />
        <div className="header-controls">
          <FaMinus className="control-icon" onClick={handleMinimize} />
          <FaTimes className="control-icon" onClick={handleClose} />
        </div>
      </div>
      {!isMinimized && (
        <>
          <Messages messages={messages} />
          <Input onSend={send} />
        </>
      )}
    </div>
  );
}

export default Chatbot;
