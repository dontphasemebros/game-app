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
import GamerNews from './forum-pages/GamerNews';
import Channel from './forum-pages/Channel';
import Replies from './forum-pages/Replies';
import Threads from './forum-pages/Threads';
import Thread from './forum-pages/Thread';
import Login from './Login';

const { getAuth, getTopScores } = require('../helpers/helpers.js');

function App() {
  const [user, setUser] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getAuth()
      .then((result) => {
        if (result) {
          setUser(result);
        }
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

  // useEffect(() => {

  // }, []);

  return (
    <BrowserRouter>
      <GameTimeLogo />
      <NavBar user={user} scores={scores} />
      <div className="container">
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/highscore" />
          <Route path="/game">
            <GamePage user={user} />
          </Route>
          <Route path="/forum">
            <Forum user={user} />
          </Route>
          <Route path="/general">
            <Channel channel={{ name: 'General', idChannel: 1 }} user={user} />
          </Route>
          <Route path="/challenges">
            <Channel channel={{ name: 'Challenges', idChannel: 2 }} user={user} />
          </Route>
          <Route path="/suggestions">
            <Channel channel={{ name: 'Suggestions', idChannel: 3 }} user={user} />
          </Route>
          <Route path="/thread">
            <Threads />
          </Route>
          <Route path="/thread:threadId">
            <Thread />
          </Route>
          <Route path="/reply">
            <Replies />
          </Route>
          <Route path="/gamer-news">
            <GamerNews />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/404">
            Not Found
          </Route>
          <Route path="/login">
            <Login />
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
