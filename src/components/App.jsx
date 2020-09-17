import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '@babel/polyfill';
import NavBar from './Navbar';
import SplashPage from './SplashPage';
import Forum from './Forum';
import Chat from './Chat';
import FooterPage from './Footer';
import Profile from './Profile';
import GamerNews from './forum-pages/GamerNews';
import Channel from './forum-pages/Channel';
import Threads from './forum-pages/Threads';
import Thread from './forum-pages/Thread';
import Login from './Login';
import Join from './Join';
import DiscordChat from './DiscordChat';
import AboutUs from './AboutUs';
import SpaceBlaster from './SpaceBlaster';
import GameTwo from './Game2';
import GameThree from './Game3';
import GamePage from './GamePage';
import BreakOut from './BreakOut';
import Germs from './Germs';
import Flood from './Flood';
import Multiplayer from './Multiplayer';

const { getAuth } = require('../helpers/helpers.js');

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAuth()
      .then((result) => {
        if (result) {
          setUser(result);
        }
      })
      .catch((err) => console.error('ERROR GETTING SESSION: ', err));
  }, []);

  const convertTime = (timestamp) => {
    const timeConfig = { dateStyle: 'short', timeStyle: 'short' };
    const convertedTs = new Date(timestamp);
    const duration = new Date().getTime() - convertedTs;
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));

    if (days === 0 && hours === 0 && minutes === 0) {
      return seconds < 10 ? 'just now' : `${seconds} seconds ago`;
    } if (days === 0 && hours === 0 && minutes !== 0) {
      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
    } if (days === 0 && hours < 24) {
      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
    }
    return `${timestamp.toLocaleString(undefined, timeConfig)}`;
  };

  return (
    <BrowserRouter>
      <NavBar user={user} convertTime={convertTime} />
      <br />
      <div className="container">
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/multiplayer">
            <Multiplayer />
          </Route>
          <Route path="/games">
            <GamePage />
          </Route>
          <Route path="/gameone">
            <SpaceBlaster user={user} />
          </Route>
          <Route path="/breakout">
            <BreakOut user={user} />
          </Route>
          <Route path="/germs">
            <Germs user={user} />
          </Route>
          <Route path="/gametwo">
            <GameTwo user={user} />
          </Route>
          <Route path="/gamethree">
            <GameThree user={user} />
          </Route>
          <Route path="/flood">
            <Flood user={user} />
          </Route>
          <Route path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/discord">
            <DiscordChat />
          </Route>
          <Route path="/highscore" />
          <Route path="/forum">
            <Forum user={user} convertTime={convertTime} />
          </Route>
          <Route path="/general">
            <Channel channel={{ name: 'General', idChannel: 1 }} user={user} convertTime={convertTime} />
          </Route>
          <Route path="/challenges">
            <Channel channel={{ name: 'Challenges', idChannel: 2 }} user={user} convertTime={convertTime} />
          </Route>
          <Route path="/suggestions">
            <Channel channel={{ name: 'Suggestions', idChannel: 3 }} user={user} convertTime={convertTime} />
          </Route>
          <Route path="/thread">
            <Threads user={user} convertTime={convertTime} />
          </Route>
          <Route path="/thread:threadId">
            <Thread user={user} convertTime={convertTime} />
          </Route>
          <Route path="/gamer-news">
            <GamerNews convertTime={convertTime} />
          </Route>
          <Route path="/profile">
            <Profile user={user} convertTime={convertTime} />
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
