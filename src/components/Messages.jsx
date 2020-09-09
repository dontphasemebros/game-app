import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
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
