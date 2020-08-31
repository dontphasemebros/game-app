import React from 'react';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';

/**
 * Header to the page, contains all our navigation links
 */
const NavBar = () => (
  <Container>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <h2>GameTime</h2>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/highscore">
          <h4>HighScore</h4>
        </Nav.Link>
        <Nav.Link href="/game">
          <h4>Game</h4>
        </Nav.Link>
        <Nav.Link href="/forum">
          <h4>Forum</h4>
        </Nav.Link>
        <Nav.Link href="/profile">
          <h4>Profile</h4>
        </Nav.Link>
      </Nav>
    </Navbar>
  </Container>
);

export default NavBar;
