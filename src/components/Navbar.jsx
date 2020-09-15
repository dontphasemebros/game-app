import React, { useState, useEffect } from 'react';
import {
  Nav, Navbar, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import GTL from '../assets/favicon.png';

const { getTopScores } = require('../helpers/helpers.js');

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);

  const [scoresByGame, setScoresByGame] = useState([]);

  const logoStyle = {
    height: '50px',
    width: '50px',
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    getTopScores()
      .then((result) => {
        setScoresByGame(result);
      })
      .catch((err) => console.error('ERROR GETTING SCORES: ', err));
  }, [show]);

  return (
    <Navbar className="navbar navbar-expand-lg" bg="dark" variant="dark">
      <Nav className="mr">
        <Navbar.Brand href="/">
          <img src={GTL} alt="Gametime Logo" style={logoStyle} />
        </Navbar.Brand>
      </Nav>
      <Nav className="mr-auto">
        <Nav.Link href="/games">
          <h4>Games</h4>
        </Nav.Link>
        <Nav.Link onClick={handleShow}>
          <h4>HighScores</h4>
        </Nav.Link>
        <Nav.Link href="/forum">
          <h4>Forum</h4>
        </Nav.Link>
        <Nav.Link href="/profile">
          <h4>Profile</h4>
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        {!Array.isArray(user) ? (
          <>
            <Nav.Link href="/api/logout"><h4>Logout</h4></Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login"><h4>Login</h4></Nav.Link>
        )}
      </Nav>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>High Scores!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {scoresByGame[0] // *** REFACTOR BELOW FOR SCORES FOR MULTIPLE GAMES
              ? scoresByGame[0].scores.map((score) => <li key={score.idScore}>{`${score.username}: ${score.value} --- ${score.createdAt.split('T')[0]}`}</li>)
              : 'no scores to show'}
          </ul>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default NavBar;

// { /* // <MDBNavbar color="unique-color-dark" dark>
// //   <MDBNavbarBrand href="/">
// //     <h3>GameTime</h3>
// //   </MDBNavbarBrand>
// //   <MDBNavLink to="/game">
// //     <h3>Game</h3>
// //   </MDBNavLink>
// // </MDBNavbar> */ }
