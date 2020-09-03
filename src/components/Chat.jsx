import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userName, setUsername] = useState('');
  const [userSet, setUserSet] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });

    function receivedMessage(message1) {
      setMessages((oldMsgs) => [...oldMsgs, message1]);
    }

    socketRef.current.on('message', (messenger) => {
      receivedMessage(messenger);
    });
  }, []);

  const spacer = {
    space: '       ',
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      username: userName,
      body: message,
      id: yourID,
    };
    setMessage('');
    socketRef.current.emit('send message', messageObject);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    setUserSet(true);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <div>
        {messages.map((value) => {
          if (value.id === yourID) {
            return (
              <div key={Math.floor(Math.random() * 1000) + 1}>
                <div>
                  {value.username}
                  :
                  {spacer.space}
                  {value.body}
                </div>
              </div>
            );
          }
          return (
            <div key={Math.floor(Math.random() * 1000) + 1}>
              <div>
                {value.username}
                :
                {value.body}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleChange} placeholder="Say something..." />
        <input type="submit" value="Submit" />
      </form>
      <br />
      {!userSet ? (
        <form onSubmit={handleUsername}>
          <input type="text" value={userName} onChange={handleUsernameChange} placeholder="Add Username" />
          <input type="submit" value="Submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Chat;
