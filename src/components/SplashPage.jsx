import React from 'react';
import asteroid from '../assets/Asteroids Gif.gif';

const SplashPage = () => (
  <div>
    <div>
      <h1>Welcome to GameTime!</h1>
    </div>
    <img src={asteroid} alt="asteroid-gameplay" />
    <br />
    <h3>Asteroids is a high octane space shooter!</h3>
    <h3>Navigate your ship between asteroids and shoot them down to increase your score!</h3>
  </div>
);

export default SplashPage;
