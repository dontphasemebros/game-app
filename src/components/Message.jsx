import React from 'react';
import ReactEmoji from 'react-emoji';
import PropTypes from 'prop-types';

import './CSS/Message.css';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">You</p>
        <div className="messageBox backgroundBlue">
          <p className="message.text colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <p className="sentText">{user}</p>
        <div className="messageBox backgroundLight">
          <p className="message.text colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    )
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default Message;
