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
    this.add.image(0, 0, 'background').setOrigin(0).setScale(0.3);
    this.add.text(250, 100, 'Star Hunter', {
      fontSize: '32px',
      fill: '#FF1493',
      fontStyle: 'bold',
    });

    this.add.text(220, 150, 'Click Here to Start!', {
      fontSize: '32px',
      fill: '#FF1493',
      fontStyle: 'bold',
    }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.scene.start('GameTwo', { room: this.room });
    });
  }
}

export default TitleScene;
