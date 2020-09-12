import Phaser from 'phaser';
import background from './assets/background.png';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    this.registry.set('highscore', 0);

    this.scene.start('Preloader');
  }
}
