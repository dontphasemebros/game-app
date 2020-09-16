import React from 'react';

const DiscordChat = () => {
  const discordSignUp = () => {
    window.open('https://discord.gg/NzNK97E', 'signup-window', 'height=900,width=750'); return false;
  };

  return (
    <div style={{ height: '800px' }}>
      <iframe
        title="discord"
        src="https://e.widgetbot.io/channels/747930227992297564/747942380749193247"
        height="600"
        width="700"
        style={{ marginTop: '60px', float: 'left' }}
      />
      <br />
      <div style={{ float: 'right', textAlign: 'center' }}>
        <h4>
          Welcome To Our Discord Server!
        </h4>
        <h6>
          Join the server to keep up
          <br />
          with other players, get updates
          <br />
          from the developers, and to use
          <br />
          our built in server chat!
        </h6>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={discordSignUp} type="button" style={{ textTransform: 'none' }}>
            <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Discord sign-in" src="https://icon-library.com/images/discord-app-icon/discord-app-icon-15.jpg" />
            Server Sign Up
          </button>
        </div>
        <iframe
          title="dcord"
          src="https://discordapp.com/widget?id=747930227992297564&theme=dark"
          width="350"
          height="500"
          allowtransparency="true"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
};

export default DiscordChat;
