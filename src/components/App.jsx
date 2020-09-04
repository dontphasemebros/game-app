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
            <Route path="/highscore" />
            <Route path="/game">
              <NavBar />
              <GamePage />
            </Route>
            <Route path="/forum">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/replies">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/discussion">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/suggestions">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/challenges">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/gamer-news">
              <NavBar />
              <Forum />
            </Route>
            <Route path="/profile">
              <NavBar />
              PROFILE
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
            <Route path="/api" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
