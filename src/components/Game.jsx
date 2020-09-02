import React from 'react';
import Phaser from 'phaser';
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

  const handleSubmit = () => {
    window.open('http://localhost:8080/chat', 'chat-window', 'height=500,width=500'); return false;
  };
  return (
    <div>
      <br />
      <div id="phaser-game" />
      <br />
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Chat" />
      </form>
    </div>
  );
};

export default GamePage;
