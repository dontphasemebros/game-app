import React from 'react';

const DiscordChat = () => (
  <div>
    <iframe
      title="discord"
      src="https://e.widgetbot.io/channels/747930227992297564/747942380749193247"
      height="600"
      width="700"
      style={{ marginTop: '40px', float: 'left' }}
    />
    <br />
    <div style={{ float: 'right', textAlign: 'center' }}>
      <h4>
        Welcome To Our Discord Server!
      </h4>
      <h6>
        Join the server to keep up
        <br />
        with other players and get
        <br />
        updates from the developers!
      </h6>
      <br />
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

export default DiscordChat;
