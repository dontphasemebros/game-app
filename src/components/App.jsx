import React, { useState, useEffect } from 'react';
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
import Profile from './Profile';

const { getAuth, getTopScores /* getUserData */ } = require('../helpers/helpers.js');

function App() {
  const [user, setUser] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getAuth()
      .then((result) => {
        setUser(result[0]);
      })
      .catch((err) => console.error('ERROR GETTING SESSION: ', err));
  }, []);

  useEffect(() => {
    getTopScores({ idGame: 1 })
      .then((result) => {
        setScores(result);
      })
      .catch((err) => console.error('ERROR GETTING SCORES: ', err));
  }, []);

  return (
    <BrowserRouter>
      <GameTimeLogo />
      <NavBar user={user} scores={scores} />
      <div className="container">
        <Switch>
          <Route path="/chat">
            <Chat user={user} />
          </Route>
          <Route path="/highscore" />
          <Route path="/game">
            <GamePage user={user} />
          </Route>
          <Route path="/forum">
            <Forum user={user} />
          </Route>
          <Route path="/replies">
            <Forum user={user} />
          </Route>
          <Route path="/discussion">
            <Forum user={user} />
          </Route>
          <Route path="/suggestions">
            <Forum user={user} />
          </Route>
          <Route path="/challenges">
            <Forum user={user} />
          </Route>
          <Route path="/gamer-news">
            <Forum user={user} />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
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
