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
  return (
    <div />
  );
};

export default GamePage;
