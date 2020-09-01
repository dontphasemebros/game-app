import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const ChatRoom = () => {
  const [roomName, setRoomname] = useState('');

  const handleRoomChange = (e) => {
    setRoomname(e.target.value);
  };

  return (
    <div style={{ float: 'right' }}>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomChange}
      />
      <Link to={`/${roomName}`}>
        Join Room
      </Link>
    </div>
  );
};

export default ChatRoom;
