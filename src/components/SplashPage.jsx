import React from 'react';
import asteroid from '../assets/asteroids.gif';

const SplashPage = () => {
  const gifStyle = {
    height: 600,
    width: 800,
    padding: '10px',
    borderRadius: '5%',
  };

  const divStyle = {
    textAlign: 'center',
  };

  return (
    <div style={divStyle}>
      <h1>Welcome to GameTime!</h1>
      <h6>The one stop spot for fun and exciting web games!</h6>
      <img src={asteroid} alt="asteroid-gameplay" style={gifStyle} />
      <br />
      <h3>
        Asteroids is a high octane space shooter!
      </h3>
      <h3>
        Avoid the asteroids and aliens, shoot them down to increase your score!
      </h3>
      <h3>
        Try and beat the highscores!
      </h3>
      <br />
    </div>
  );
};

export default SplashPage;
