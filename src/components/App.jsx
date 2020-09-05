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

const { getAuth /* getUserData */ } = require('../helpers/helpers.js');

// const handleTestButtonA = () => {
//   getAuth()
//     .then((result) => {
//       console.log('GET AUTH RESULT: ', result);
//     })
//     .catch((err) => console.error('ERROR ON GETAUTH TEST: ', err));
// };

// const handleTestButtonB = () => {
//   getUserData()
//     .then((result) => {
//       console.log('GET USER DATA RESULT: ', result);
//     })
//     .catch((err) => console.error('ERROR ON GETAUTH TEST: ', err));
// };

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    getAuth()
      .then((result) => {
        console.log('GET AUTH RESULT: ', result);
        setUser(result[0]);
      })
      .catch((err) => console.error('ERROR ON GETAUTH TEST: ', err));
  }, []);

  return (
    <BrowserRouter>
      <GameTimeLogo />
      <NavBar user={user} />
      <div className="container">
        <Switch>
          <Route path="/chat" user={user}>
            <Chat />
          </Route>
          <Route path="/highscore" />
          <Route path="/game">
            <GamePage user={user} />
          </Route>
          <Route path="/forum" user={user}>
            <Forum />
          </Route>
          <Route path="/replies" user={user}>
            <Forum />
          </Route>
          <Route path="/discussion" user={user}>
            <Forum />
          </Route>
          <Route path="/suggestions" user={user}>
            <Forum />
          </Route>
          <Route path="/challenges" user={user}>
            <Forum />
          </Route>
          <Route path="/gamer-news" user={user}>
            <Forum />
          </Route>
          <Route path="/profile" user={user}>
            <Profile />
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

// App.propTypes = {
//   user: PropTypes.obj,
// };

export default App;
