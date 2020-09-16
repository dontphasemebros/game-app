import React from 'react';
import {
  MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer,
} from 'mdbreact';
import ben from '../assets/ben.jpg';
import connor from '../assets/cschratz.jpg';
import james from '../assets/slim.jpg';
import gmoney from '../assets/gmoney.png';
import close from '../assets/closeIcon.png';

const GamePage = () => (
  <MDBContainer>
    <MDBCarousel
      activeItem={1}
      length={5}
      // eslint-disable-next-line react/jsx-boolean-value
      showControls={true}
      // eslint-disable-next-line react/jsx-boolean-value
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>

        <MDBCarouselItem itemId="1">
          <MDBView>
            <img src={ben} alt="First slide" className=" w-100" />
          </MDBView>
          <MDBCarouselCaption>
            <h5 href="/gameone">
              Space Blaster
            </h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="2">
          <MDBView>
            <img src={james} alt="Second slide" className="d-block w-100" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 href="/gametwo">
              Star Hunter
            </h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="3">
          <MDBView>
            <img src={connor} alt="Third slide" className="d-block w-100" />
          </MDBView>
          <MDBCarouselCaption>
            <h5 href="/gamethree">
              Pickup Stars
            </h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="4">
          <MDBView>
            <img src={gmoney} alt="Fourth slide" className="d-block w-100" />
          </MDBView>
          <MDBCarouselCaption>
            <h5 href="/breakout">
              Break Out
            </h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="5">
          <MDBView>
            <img src={close} alt="Fifth slide" className="d-block w-100" />
          </MDBView>
          <MDBCarouselCaption>
            <h5 href="/germs">
              Germs!
            </h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  </MDBContainer>
);

export default GamePage;
