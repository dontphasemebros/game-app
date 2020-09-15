import Phaser from 'phaser';
import sky from '../assets/sky.png';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  preload() {
    this.load.image('sky', sky);
  }

  create() {
    const background = this.add.sprite(0, 0, 'sky');
    background.setOrigin(0, 0);
    this.add.text(300, 350, 'Ready To Pick Up Stars?', { font: '25px Arial', fill: 'red' });
    const text = this.add.text(300, 300, 'Click Here To Start!!!!', { font: '25px Arial', fill: 'red' });
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => this.clickButton());
  }

  clickButton() {
    this.scene.switch('GameThree');
  }
}

export default TitleScene;
