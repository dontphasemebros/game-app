import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import NavBar from './Navbar';
import SplashPage from './SplashPage';
import GameTimeLogo from './GameTimeLogo';
import GamePage from './Game';
import Forum from './Forum';
import ForumPage from './ForumPages';

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
              <ForumPage />
            </Route>
            <Route path="/challenges">
              <ForumPage />
            </Route>
            <Route path="/suggestions*">
              <ForumPage />
            </Route>
            <Route path="/gamer-news">
              <ForumPage />
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
