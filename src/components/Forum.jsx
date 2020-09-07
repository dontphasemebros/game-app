import React, { useState, useEffect } from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import GeneralDiscussion from './forum-pages/DiscussionPage';
import Challenges from './forum-pages/Challenges';
import Suggestions from './forum-pages/Suggestions';
import GamerNews from './forum-pages/GamerNews';
import Discussion from './forum-pages/Discussion';

const { getThreadsByChannel } = require('../helpers/helpers.js');
// ************** NOTE: SAMPLE DATA CHANNEL 1 IS EMPTY

const Thread = () => {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    getThreadsByChannel({ idChannel: 2 }) // ************* PREVENTING HUSKY TO BE ABLE TO COMMIT
      .then((result) => {
        setThreads(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, []);

  const storage = [];
  for (let i = 0; i < threads.length; i += 1) {
    storage.push(
      <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
        <div className={`profile-picture${i} panel-body text-left inline-block`}>
          <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '360px' }}>
            <img className="d-print-inline-block" src={threads[i].profilePhotoUrl} height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
            <div className={`username${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <h5 style={{ marginLeft: '20px', marginRight: '20px', minWidth: '80px' }}>{threads[i].username}</h5>
            </div>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }}>{threads[i].createdAt.split('T')[0]}</span>
            </div>
          </div>
          <Navbar.Brand href="/replies">
            <h4 style={{ display: 'inline-block', marginLeft: '20px' }}>{threads[i].text}</h4>
          </Navbar.Brand>
        </div>
      </div>,
    );
  }
  return storage;
};
//--------------------------------------------------------------------------------

const Forum = ({ threads }) => (
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
                  <h2>General Discussion</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Challenges list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/challenges">
                  <h2>Challenges</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Suggestions list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/suggestions">
                  <h2>Suggestions</h2>
                </Navbar.Brand>
              </li>
            </div>
            <div style={{ padding: '20px' }}>
              <li className="Forum-Topic-Gamer-News list-group-item" style={{ backgroundColor: '#ececec' }}>
                <Navbar.Brand href="/gamer-news">
                  <h2>Gamer News</h2>
                </Navbar.Brand>
              </li>
            </div>
          </div>
        </Route>
        <Route exact path="/discussion">
          <GeneralDiscussion forEachDiscussion={Thread} />
        </Route>
        <Route exact path="/challenges">
          <Challenges threads={threads} forEachChallenge={Thread} />
        </Route>
        <Route exact path="/suggestions">
          <Suggestions forEachSuggestion={Thread} />
        </Route>
        <Route exact path="/gamer-news">
          <GamerNews />
        </Route>
        <Route exact path="/replies">
          <Discussion threads={threads} forEachDiscussion={Thread} />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

Forum.propTypes = {
  threads: PropTypes.arrayOf.isRequired,
};

export default Forum;
