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
        <div>
          <h3>
            Space Roids is a high octane space shooter!
          </h3>
          <h3>
            Avoid the asteroids and aliens, shoot them down to increase your score!
          </h3>
          <h3>
            Try and beat the highscores!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
