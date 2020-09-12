import React from 'react';
import GTL from '../assets/favicon.png';
import asteroid from '../assets/asteroids.gif';
import starhunter from '../assets/starhunter.gif';

const GamePage = () => {
  const styles = {
    marginBottom: '3px',
    marginRight: '5px',
  };

  const gifStyle = {
    height: 250,
    width: 350,
    borderRadius: '5%',
  };

  const div = {
    textAlign: 'center',
  };

  return (
    <div style={div}>
      <br />
      <img src={asteroid} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Destroy asteroids and aliens to increase your score!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gameone" role="button">
          <img width="20px" style={styles} alt="Discord sign-in" src={GTL} />
          Space Blaster
        </a>
      </div>
      <br />
      <img src={starhunter} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Collect stars with your friends, be the first team to hit 200 to win!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gametwo" role="button">
          <img width="20px" style={styles} alt="Discord sign-in" src={GTL} />
          Star Hunter
        </a>
      </div>
      <br />
      <img src={starhunter} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Collect stars from all platforms while avoiding bombs!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gamethree" role="button">
          <img width="20px" style={styles} alt="Discord sign-in" src={GTL} />
          Pickup Stars
        </a>
      </div>
    </div>
  );
};

export default GamePage;
