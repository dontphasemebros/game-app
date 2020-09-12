import Phaser from 'phaser';
import background from './assets/background.jpg';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  init(data) {
    this.room = data.room;
  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0).setScale(0.6);
    this.add.text(120, 350, 'Welcome to Star Hunter!', {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    });
    this.add.text(225, 400, 'Enter a Room Name First! \nClick Here To Play!', {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.scene.start('GameTwo', { room: this.room });
    });
  }
}

export default TitleScene;
