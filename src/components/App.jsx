import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import NavBar from './Navbar';
import SplashPage from './SplashPage';
import GameTimeLogo from './GameTimeLogo';
import GamePage from './Game';
import Forum from './Forum';
<<<<<<< HEAD
import GeneralDiscussion from './forum-pages/DiscussionPage';
import Challenges from './forum-pages/Challenges';
import Suggestions from './forum-pages/Suggestions';
import GamerNews from './forum-pages/GamerNews';
import Replies from './forum-pages/ForumReplies';
=======
import Chat from './Chat';
>>>>>>> 67322e67a23567c7a4297cf425a452322b10c3a0

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <GameTimeLogo />
        <div className="row">
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/highscore">
              <NavBar />
              HighScore
            </Route>
            <Route path="/game">
              <NavBar />
              <GamePage />
            </Route>
            <Route path="/forum">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/profile">
              <NavBar />
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
              <NavBar />
              Not Found
            </Route>
            <Route path="/">
              <NavBar />
              <SplashPage />
            </Route>
            <Route path="/loginFailure">
              <NavBar />
              Please Login With Valid Credentials
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
