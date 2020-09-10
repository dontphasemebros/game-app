import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './CSS/Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleName = (event) => setName(event.target.value);

  const handleRoom = (event) => setRoom(event.target.value);

  const handleSubmit = (event) => ((!name || !room) ? event.preventDefault() : null);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input className="joinInput" placeholder="Name" type="text" onChange={handleName} />
        </div>
        <div>
          <input className="joinInput mt-20" placeholder="Room" type="text" onChange={handleRoom} />
          <Link onClick={handleSubmit} to={`/chat?name=${name}&room=${room}`}>
            <button className="button mt-20" type="submit">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
