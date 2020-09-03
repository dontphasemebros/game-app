import React, { useState } from 'react';
import {
  Nav, Navbar, Container, Modal,
} from 'react-bootstrap';

/**
 * Header to the page, contains all our navigation links
 */
const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    console.log(show);
  };
  const handleClose = () => setShow(false);

  return (
    <Container>
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
        </Nav>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>High Scores!</Modal.Title>
        </Modal.Header>
        <Modal.Body>List of HighScores!</Modal.Body>
      </Modal>
    </Container>
  );
};

export default NavBar;
