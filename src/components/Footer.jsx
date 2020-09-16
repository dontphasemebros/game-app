import React from 'react';
import {
  Col, Container, Row, Footer,
} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';

const FooterPage = () => (
  <Footer color="stylish-color-dark" className="font-small pt-2 mt-2">
    <Container className="text-center">
      <Row>
        <hr className="clearfix w-100 d-md-none" />
        <Col md="6">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">Our History</h5>
          <div><a href="/aboutus">About Us</a></div>
        </Col>
        <hr className="clearfix w-100 d-md-none" />
        <Col md="6">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">Games</h5>
          <div><a href="/gameone">Space Blaster</a></div>
          <div><a href="/multiplayer">Star Hunter</a></div>
          <div><a href="/gamethree">Star Pickup</a></div>
          <div><a href="/breakout">Breakout</a></div>
          <div><a href="/germs">Germs</a></div>
          <div><a href="/flood">Flood</a></div>
        </Col>
      </Row>
    </Container>
    <hr />
    <div className="footer-copyright text-center">
      <Container fluid>
        {(new Date().getFullYear())}
        {' '}
        <a href="https://www.phaserbros.com">PhaserBros.com</a>
      </Container>
    </div>
  </Footer>
);

export default FooterPage;
