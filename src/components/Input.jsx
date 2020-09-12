import React from 'react';
import PropTypes from 'prop-types';

import './CSS/Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button type="submit" className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
  </form>
);

export default Input;

Input.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};
