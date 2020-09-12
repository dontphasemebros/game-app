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
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Our History</h5>
          <li><a href="/aboutus">About Us</a></li>
        </Col>
        <hr className="clearfix w-100 d-md-none" />
        <Col md="6">
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Games</h5>
          <li><a href="/gameone">Space Blaster</a></li>
          <li><a href="/gametwo">Star Hunter</a></li>
          <li><a href="/gamethree">Star Pickup</a></li>
          <li><a href="/breakout">Breakout</a></li>
          <li><a href="/germs">Germs</a></li>
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
