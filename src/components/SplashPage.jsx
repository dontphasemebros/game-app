import React from 'react';
import asteroid from '../assets/asteroids.gif';

const SplashPage = () => {
  const gifStyle = {
    height: 550,
    width: 700,
    padding: '10px',
    borderRadius: '5%',
  };

  const divStyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <div style={divStyle}>
        <h1>Welcome to GameTime!</h1>
        <h6>The one stop spot for fun and exciting web games!</h6>
        <img src={asteroid} alt="asteroid-gameplay" style={gifStyle} />
        <div style={{ float: 'right', paddingTop: '10px', paddingRight: '20px' }}>
          <h6>
            Interested In Joining Our Discord?
          </h6>
          <iframe
            title="dcord"
            src="https://discordapp.com/widget?id=747930227992297564&theme=dark"
            width="350"
            height="400"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
          <div className="d-flex justify-content-center">
            <a className="btn btn-primary" href="/discord" role="button" style={{ textTransform: 'none' }}>
              <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Discord sign-in" src="https://icon-library.com/images/discord-app-icon/discord-app-icon-15.jpg" />
              Live Discord Chat
            </a>
          </div>
        </div>
        <br />
        <h3>
          GameTime provides users with fun and interactive web games.
        </h3>
        <h3>
          Feel free to try out our games and let us know your thoughts in the forums!
        </h3>
        <h3>
          Are you a developer? Got a game you&apos;d like to have hosted? Make forum post!
          <br />
          Be sure to link your Github repository and provide a description of the game!
        </h3>
      </div>
      <br />
    </div>
  );
};

export default SplashPage;
