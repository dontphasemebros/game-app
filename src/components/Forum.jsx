import React from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import GeneralDiscussion from './forum-pages/DiscussionPage';
import Challenges from './forum-pages/Challenges';
import Suggestions from './forum-pages/Suggestions';
import GamerNews from './forum-pages/GamerNews';
import Discussion from './forum-pages/Discussion';

//--------------------------------------------------------------------------------
// LIST OF METHODS TO USE FOR DISCUSSIONS

// RENDERS N NUMBER OF DISCUSSIONS UNDER A CHANNEL

const forEachDiscussion = () => {
  const storage = [];
  for (let i = 0; i < 6; i += 1) {
    storage.push(
      <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
        <div className={`profile-picture${i} panel-body text-left inline-block`}>
          <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '300px' }}>
            <img className="d-print-inline-block" src="https://www.nationalgeographic.com/content/dam/animals/2019/10/goldfish/01-goldfish-nationalgeographic_1567132.jpg" height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
            <div className={`username${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <h5>Goldfish</h5>
            </div>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }}>10/20/2020</span>
            </div>
          </div>
          <Navbar.Brand href="/replies">
            <h4 style={{ display: 'inline-block' }}>Listeninginginging to the greatest tune</h4>
          </Navbar.Brand>
        </div>
      </div>,
    );
  }
  return storage;
};
//--------------------------------------------------------------------------------

const Forum = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={'/forum' || '/replies'}>
          <div style={{ padding: '20px' }}>
            <div className="card text-white bg-secondary mb-3">
              <h2 className="card-header">
                Game-Time Forum
              </h2>
            </div>
          </div>
          <div className="ForumBody list-group">
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-General-Discussion list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/discussion">
                  <h2>This is the topic for General-Discussion</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Challenges list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/challenges">
                  <h2>This is the topic for Challenges</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Suggestions list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/suggestions">
                  <h2>This is the topic for Suggestions</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Gamer-News list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/gamer-news">
                  <h2>This is the topic for Gamer News</h2>
                </Navbar.Brand>
              </li>
            </div>
          </div>
        </Route>
        <Route exact path="/discussion">
          <GeneralDiscussion forEachDiscussion={forEachDiscussion} />
        </Route>
        <Route exact path="/challenges">
          <Challenges forEachChallenge={forEachDiscussion} />
        </Route>
        <Route exact path="/suggestions">
          <Suggestions forEachSuggestion={forEachDiscussion} />
        </Route>
        <Route exact path="/gamer-news">
          <GamerNews />
        </Route>
        <Route exact path="/replies">
          <Discussion forEachDiscussion={forEachDiscussion} />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Forum;
