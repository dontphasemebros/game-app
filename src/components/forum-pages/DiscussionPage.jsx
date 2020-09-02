import React from 'react';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';
import fakeData from './FakeData';

const forEachDiscussion = () => {
  const storage = [];
  for (let i = 0; i < 10; i++) {
    storage.push(
      <div className={`GeneralDisussion-Discussions-${i}`} style={{ backgroundColor: '#ececec', minHeight: '60px' }}>
        <Navbar.Brand href="/replies">
          <h2>This game should be done better...</h2>
        </Navbar.Brand>
        <div style={{ display: 'inline-block', marginBottom: '50px'}} className={`username${i}`}>
          <h3>By: Author Name</h3>
        </div>
        <div style={{ display: 'inline-block' }} className={`profile-picture${i}`}>
          <h4> |ProfilePicture goes here |</h4>
        </div>
      </div>,
    );
  }
  return storage;
};

const GeneralDiscussion = () => (
  <div>
    <div className="GeneralDiscussion-Header">
      <h2>
        This is the General Discussion header
      </h2>
    </div>
    <div className="GeneralDiscussion-Body">
      <h4>This is the General Discussion body</h4>
      {forEachDiscussion()}
    </div>
  </div>
);

export default GeneralDiscussion;
