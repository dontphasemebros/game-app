import Phaser from 'phaser';
import background from './assets/background.jpg';

class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  init(data) {
    this.scores = data.scores;
  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0).setScale(0.3);
    this.add.text(250, 100, 'Game Over!', {
      fontSize: '32px',
      fill: '#FF1493',
      fontStyle: 'bold',
    });

    if (this.scores.blue > this.scores.red) {
      this.add.text(270, 170, 'Blue Team Won!', {
        fontSize: '32px',
        fill: '#FF1493',
        fontStyle: 'bold',
      });
      window.score = this.scores.blue;
    } else {
      this.add.text(270, 170, 'Read Team Won!', {
        fontSize: '32px',
        fill: '#FF1493',
        fontStyle: 'bold',
      });
      window.score = this.scores.red;
    }
  }
}

export default GameOver;
