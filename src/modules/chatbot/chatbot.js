import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import API from './ChatbotAPI';
import './chatbot.css';
import {FaTimes, FaMinus} from 'react-icons/fa';

function Header() {
  return <div className="chatbot-header">&nbsp;React Chatbot UI</div>;
}

function Input({onSend}) {
  const [text, setText] = useState('');

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const handleSend = e => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <div className="input">
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

function BotMessage({fetchMessage}) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? '...' : message}</div>
    </div>
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse('hi')}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />,
    );
    setMessages(newMessages);
  };

  const handleMinimize = () => {
    setIsMinimized(prevState => !prevState);
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) return null;

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
