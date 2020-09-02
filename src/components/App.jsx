import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import NavBar from './Navbar';
import SplashPage from './SplashPage';
import GameTimeLogo from './GameTimeLogo';
import GamePage from './Game';
import Forum from './Forum';
import GeneralDiscussion from './forum-pages/DiscussionPage';
import Challenges from './forum-pages/Challenges';
import Suggestions from './forum-pages/Suggestions';
import GamerNews from './forum-pages/GamerNews';
import Replies from './forum-pages/ForumReplies';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <GameTimeLogo />
        <NavBar />
        <div className="row">
          <Switch>
            <Route path="/highscore">
              HighScore
            </Route>
            <Route path="/game">
              <GamePage />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/profile">
              PROFILE
            </Route>
            <Route path="/discussion">
              <GeneralDiscussion />
            </Route>
            <Route path="/challenges">
              <Challenges />
            </Route>
            <Route path="/suggestions*">
              <Suggestions />
            </Route>
            <Route path="/gamer-news">
              <GamerNews />
            </Route>
            <Route path="/replies">
              <Replies />
            </Route>
            <Route path="/404">
              Not Found
            </Route>
            <Route path="/">
              <SplashPage />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
