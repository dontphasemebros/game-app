import React, { useState, useEffect } from 'react';
import {
  Nav, Navbar, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const { getTopScores } = require('../helpers/helpers.js');

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);

  const [scores, setScores] = useState([]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    getTopScores({ idGame: 1 })
      .then((result) => {
        setScores(result);
      })
      .catch((err) => console.error('ERROR GETTING SCORES: ', err));
  }, [show]);

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Navbar.Brand href="/">
          <h3>GameTime</h3>
        </Navbar.Brand>
        <Nav.Link onClick={handleShow}>
          <h3>HighScore</h3>
        </Nav.Link>
        <Nav.Link href="/game">
          <h3>Game</h3>
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
          // <Nav.Link href="/api/google"><h3>Login</h3></Nav.Link>
          <Nav.Link href="/login"><h3>Login</h3></Nav.Link>
        )}
      </Nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>High Scores!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {scores
              ? scores.map((score) => <li key={score.idScore}>{`${score.username}: ${score.value} --- ${score.createdAt.split('T')[0]}`}</li>)
              : 'no scores to show'}
          </ul>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.objectOf.isRequired,
  scores: PropTypes.element.isRequired,
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
