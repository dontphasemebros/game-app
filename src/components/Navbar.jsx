import React from 'react';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';

/**
 * Header to the page, contains all our navigation links
 */
const NavBar = () => (
  <Container>
    <Navbar bg="dark" variant="dark" style={{ backgroundColor: '#ececec', maxHeight: '40px' }}>
      <Nav className="mr-auto">
        <Navbar.Brand href="/" style={{ display: 'inline-block', marginRight: '90px', marginLeft: '120px' }}>
          <h3>GameTime</h3>
        </Navbar.Brand>
        <Nav.Link href="/highscore" style={{ display: 'inline-block', marginRight: '90px' }}>
          <h3>HighScore</h3>
        </Nav.Link>
        <Nav.Link href="/game" style={{ display: 'inline-block', marginRight: '90px' }}>
          <h3>Game</h3>
        </Nav.Link>
        <Nav.Link href="/forum" style={{ display: 'inline-block', marginRight: '90px', marginBottom: '10px' }}>
          <h3>Forum</h3>
        </Nav.Link>
        <Nav.Link href="/profile" style={{ display: 'inline-block', marginRight: '120px' }}>
          <h3>Profile</h3>
        </Nav.Link>
        <Nav.Link href="/login" style={{ display: 'inline-block', marginRight: '120px' }}>
          <h3>Login</h3>
        </Nav.Link>
      </Nav>
    </Navbar>
  </Container>
);

export default NavBar;
