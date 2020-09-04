import React from 'react';
import Phaser from 'phaser';
import { Button } from 'react-bootstrap';
import PlayScene from '../Game/scenes/playScenes';
import PreloadScene from '../Game/scenes/PreloadScene';
import GameOverScene from '../Game/scenes/GameOver';

const GamePage = () => {
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

  const game = new Phaser.Game(config);

  game.scene.add('PlayScene', PlayScene);
  game.scene.add('preload', PreloadScene);
  game.scene.add('gameOver', GameOverScene);
  game.scene.start('preload');

  const redirect = process.env.REACT_APP_CHAT || 'https://phaserbros.com/chat';

  const handleSubmit = () => {
    window.open(`${redirect}`, 'chat-window', 'height=500,width=500'); return false;
  };

  return (
    <div>
      <br />
      <div id="phaser-game" />
      <br />
      <Button onClick={handleSubmit} variant="danger">
        Live Game Chat
      </Button>
    </div>
  );
};

export default GamePage;
