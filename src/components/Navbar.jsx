import React, { useState, useEffect } from 'react';
import {
  Nav, Navbar, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Score from './Score';

const { getTopScores } = require('../helpers/helpers.js');

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);

  const [scoresByGame, setScoresByGame] = useState([]);

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
    <Navbar bg="dark" variant="dark">
      <Nav className="m-auto">
        <Navbar.Brand href="/">
          <h3>GameTime</h3>
        </Navbar.Brand>
        <Nav.Link onClick={handleShow}>
          <h3>HighScore</h3>
        </Nav.Link>
        <Nav.Link href="/games">
          <h3>Games</h3>
        </Nav.Link>
        <Nav.Link href="/forum">
          <h3>Forum</h3>
        </Nav.Link>
        <Nav.Link href="/profile">
          <h3>Profile</h3>
        </Nav.Link>
        {!Array.isArray(user) ? (
          <>
            <Nav.Link href="/api/logout"><h3>Logout</h3></Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login"><h3>Login</h3></Nav.Link>
        )}
      </Nav>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>High Scores!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {scoresByGame.length
              ? (
                scoresByGame.map((game) => (
                  <Score game={game} key={game.idScore} />
                ))
              )
              : 'no scores to show'}
          </>
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
