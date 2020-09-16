import React from 'react';
import {
  MDBCarousel, MDBCarouselCaption, MDBCarouselInner,
  MDBCarouselItem, MDBView, MDBContainer,
} from 'mdbreact';
import asteroids from '../assets/asteroids.gif';
import starhunter from '../assets/starhunter.gif';
import starcollecter from '../assets/starcollecter.gif';
import breakout from '../assets/BREAKOUT.gif';
import slimes from '../assets/slimes.gif';
import flood from '../assets/flood.gif';
import './CSS/style.css';

const GamePage = () => (
  <MDBContainer style={{ height: '64vh' }}>
    <MDBCarousel
      interval="5000"
      activeItem={1}
      length={6}
      showControls
      showIndicators
      className="z-depth-1"
    >
      <MDBCarouselInner>

        <MDBCarouselItem itemId="1">
          <MDBView>
            <img src={asteroids} alt="First slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/gameone" style={{ fontSize: '24px' }}>Space Blaster</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="2">
          <MDBView>
            <img src={starhunter} alt="Second slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/multiplayer" style={{ fontSize: '24px' }}>Star Hunter</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="3">
          <MDBView>
            <img src={starcollecter} alt="Third slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/gamethree" style={{ fontSize: '24px' }}>Star Pickup</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="4">
          <MDBView>
            <img src={breakout} alt="Fourth slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/breakout" style={{ fontSize: '24px' }}>Break Out</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="5">
          <MDBView>
            <img src={slimes} alt="Fifth slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/germs" style={{ fontSize: '24px' }}>Germs</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="6">
          <MDBView>
            <img src={flood} alt="Sixth slide" className="mx-auto d-block p-3" />
          </MDBView>
          <MDBCarouselCaption>
            <a href="/flood" style={{ fontSize: '24px' }}>Flood</a>
          </MDBCarouselCaption>
        </MDBCarouselItem>

      </MDBCarouselInner>
    </MDBCarousel>
  </MDBContainer>
);

export default GamePage;
