import React from 'react';
import Phaser from 'phaser';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PlayScene from '../Game/scenes/playScenes';
import PreloadScene from '../Game/scenes/PreloadScene';
import GameOverScene from '../Game/scenes/GameOver';

const GamePage = React.memo(({ user }) => {
  const descriptionStyle = {
    float: 'right',
    marginTop: '50px',
  };
  const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    audio: {
      disableWebAudio: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        fps: 60,
        gravity: { y: 0 },
      },
    },
  };
  if (!Array.isArray(user)) {
    const game = new Phaser.Game(config);
    game.scene.add('PlayScene', PlayScene);
    game.scene.add('preload', PreloadScene);
    game.scene.add('gameOver', GameOverScene);
    game.scene.start('preload');
  }
  const redirect = process.env.REACT_APP_CHAT || 'https://phaserbros.com/chat';
  const handleSubmit = () => {
    window.open(`${redirect}`, 'chat-window', 'height=500,width=530'); return false;
  };
  return (
    <div id="phaser-game">
      <br />
      {!Array.isArray(user) ? (
        <div style={descriptionStyle}>
          <h4>Space Roids</h4>
          <p>
            Destroy asteroids and aliens to
            <br />
            increase your score!
            <br />
            Join the Leader Board by submitting
            <br />
            your score!
          </p>
          <br />
          <br />
          <h4>Controls</h4>
          <p>
            Arrow keys: Navigate your ship
            <br />
            Spacebar: Fire your lasers
            <br />
            Shift: Launch a salvo of missiles
          </p>
          <br />
          <br />
          <Button onClick={handleSubmit} variant="danger">
            <h6>Live Game Chat</h6>
          </Button>
        </div>
      ) : <h1 style={{ textAlign: 'center' }}>Please Login With Discord or Google</h1> }
      <br />
    </div>
  );
});

GamePage.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default GamePage;
