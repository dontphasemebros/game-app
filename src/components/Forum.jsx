import React from 'react';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';

const Forum = () => (
  <div>
    <div className="ForumHeader">
      <h1>This is the forum header:</h1>
    </div>
    <div className="ForumBody">
      <h1>This is the forum Body</h1>
      <div className="Forum-Topic-General-Discussion" style={{ backgroundColor: '#ececec', minHeight: '60px' }}>
        <Navbar.Brand href="/discussion">
        <h2 style={{ positon: 'absolute', marginTop: '20px' }}>This is the topic for General-Discussion</h2>
      </Navbar.Brand>
      </div>
      <div className="Forum-Topic-Challenges" style={{ backgroundColor: '#ececec', minHeight: '60px' }}>
        <Navbar.Brand href="/challenges">
        <h2>This is the topic for Challenges</h2>
        </Navbar.Brand>
      </div>
      <div className="Forum-Topic-Suggestions" style={{ backgroundColor: '#ececec', minHeight: '60px' }}>
        <Navbar.Brand href="/suggestions">
        <h2>This is the topic for Suggestions</h2>
        </Navbar.Brand>
      </div>
      <div className="Forum-Topic-Gamer-News" style={{ backgroundColor: '#ececec', minHeight: '60px' }}>
        <Navbar.Brand href="/gamer-news">
        <h2>This is the topic for Gamer News</h2>
        </Navbar.Brand>
      </div>
    </div>
    <br />
  </div>
);

export default Forum;
