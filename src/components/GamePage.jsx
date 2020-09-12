import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import GTL from '../assets/favicon.png';
import asteroid from '../assets/asteroids.gif';
import starhunter from '../assets/starhunter.gif';

const GamePage = () => {
  const [room, setRoom] = useState('');
  const styles = {
    marginBottom: '3px',
    marginRight: '5px',
  };

  const gifStyle = {
    height: 250,
    width: 350,
    borderRadius: '5%',
  };

  const div = {
    textAlign: 'center',
  };

  const roomToast = () => toast('Room Selected! Start Your Game!');

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  return (
    <div style={div}>
      <br />
      <img src={asteroid} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Destroy asteroids and aliens to increase your score!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gameone" role="button">
          <img width="20px" style={styles} alt="Discord sign-in" src={GTL} />
          Space Blaster
        </a>
      </div>
      <br />
      <img src={starhunter} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Collect stars with your friends, be the first team to hit 200 to win!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href={`/gametwo?${room}`} role="button">
          <img width="20px" style={styles} alt="Discord sign-in" src={GTL} />
          Star Hunter
        </a>
      </div>
      <div>
        <Form>
          <Form.Group controlId="setUpRoom">
            <Form.Label>Room Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Room Name" onChange={handleRoom} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={roomToast}>
            Submit
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
};

export default GamePage;
