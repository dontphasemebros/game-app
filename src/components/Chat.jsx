import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

import './CSS/Chat.css';

let socket;

const Chat = withRouter((props) => {
  const [name1, setName] = useState('');
  const [room1, setRoom] = useState('');
  const [users1, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.REACT_APP_DEVELOPMENT_CHAT || process.env.REACT_APP_DEPLOY_CHAT;

  useEffect(() => {
    const { name, room } = queryString.parse(props.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join1', { name, room }, () => {
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, props.location.search]);

  useEffect(() => {
    socket.on('message', (message1) => {
      setMessages((msgs) => [...msgs, message1]);
    });
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  };

  return (
    <div className="outerContainer">
      <br />
      <br />
      <div className="chatcontainer">
        <br />
        <InfoBar room={room1} users={users1} />
        <Messages messages={messages} name={name1} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
});

export default Chat;
