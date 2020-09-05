import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import NavBar from './Navbar';
import SplashPage from './SplashPage';
import GameTimeLogo from './GameTimeLogo';
import GamePage from './Game';
import Forum from './Forum';
import Chat from './Chat';
import FooterPage from './Footer';

function App() {
  return (
    <BrowserRouter>
      <GameTimeLogo />
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/highscore" />
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/forum">
            <Forum />
          </Route>
          <Route path="/replies">
            <Forum />
          </Route>
          <Route path="/discussion">
            <Forum />
          </Route>
          <Route path="/suggestions">
            <Forum />
          </Route>
          <Route path="/challenges">
            <Forum />
          </Route>
          <Route path="/gamer-news">
            <Forum />
          </Route>
          <Route path="/profile">
            PROFILE
          </Route>
          <Route path="/404">
            Not Found
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
          <Route path="/loginFailure">
            Please Login With Valid Credentials
          </Route>
          <Route path="/api" />
        </Switch>
      </div>
      <FooterPage />
    </BrowserRouter>
  );
}

export default App;
