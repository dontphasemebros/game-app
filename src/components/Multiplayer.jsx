import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import starhunter from '../assets/starhunter.gif';
import GTL from '../assets/favicon.png';

const Multiplayer = () => {
  const [room, setRoom] = useState('');

  const roomToast = () => toast('Room Selected! Start Your Game!');

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const styles = {
    marginBottom: '3px',
    marginRight: '5px',
  };

  const gifStyle = {
    height: 450,
    width: 550,
    borderRadius: '5%',
  };

  return (
    <div className="d-flex align-items-center flex-column">
      <br />
      <img src={starhunter} alt="asteroid-gameplay" style={gifStyle} />
      <br />
      <h5 className="text-center">
        Collect stars with your friends, be the first team to hit 200 to win!
        <br />
        Please enter a room name below to start a new game with your friends!
        <br />
        All players can then input that room name and be added to the game!
      </h5>
      <br />
      <div>
        <Form className="d-flex align-items-center flex-column">
          <Form.Group controlId="setUpRoom">
            <Form.Control type="text" placeholder="Enter Room Name" onChange={handleRoom} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={roomToast}>
            Submit
          </Button>
          <ToastContainer />
        </Form>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href={`/gametwo?${room}`} role="button">
          <img width="20px" style={styles} alt="starhunter" src={GTL} />
          Star Hunter
        </a>
      </div>
      <br />
    </div>
  );
};

export default Multiplayer;
