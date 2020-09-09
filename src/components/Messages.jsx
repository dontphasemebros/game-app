import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';
import Message from './Message';

import './CSS/Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((messenger) => (
      <div key={Math.random()}>
        <Message message={messenger} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;

Messages.propTypes = {
  messages: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};
