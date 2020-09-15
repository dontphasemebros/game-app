import React from 'react';
import GTL from '../assets/favicon.png';
import asteroid from '../assets/asteroids.gif';
import starhunter from '../assets/starhunter.gif';
import breakout from '../assets/BREAKOUT.gif';
import slime from '../assets/slimes.gif';
import starsollector from '../assets/starcollecter.gif';

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

  return (
    <div className="d-flex align-items-center flex-column">
      <br />
      <img src={asteroid} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Destroy asteroids and aliens to increase your score!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gameone" role="button">
          <img width="20px" style={styles} alt="asteroids" src={GTL} />
          Space Blaster
        </a>
      </div>
      <br />
      <img src={starhunter} alt="asteroid-gameplay" style={gifStyle} />
      <h5>
        Collect stars with your friends, be the first team to hit 200 to win!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/multiplayer" role="button">
          <img width="20px" style={styles} alt="starhunter" src={GTL} />
          Star Hunter
        </a>
      </div>
      <br />
      <img src={starsollector} alt="starcollector-gameplay" style={gifStyle} />
      <h5>
        Collect stars from all platforms while avoiding bombs!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/gamethree" role="button">
          <img width="20px" style={styles} alt="pick up stars" src={GTL} />
          Pickup Stars
        </a>
      </div>
      <br />
      <img src={breakout} alt="breakout-gameplay" style={gifStyle} />
      <h5>
        Destroy all the blocks!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/breakout" role="button">
          <img width="20px" style={styles} alt="breakout" src={GTL} />
          Break Out
        </a>
      </div>
      <br />
      <img src={slime} alt="germs gif" style={gifStyle} />
      <h5>
        Avoid the germs!
      </h5>
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/germs" role="button">
          <img width="20px" style={styles} alt="germs" src={GTL} />
          Germs!
        </a>
      </div>
    </div>
  );
};

export default GamePage;
