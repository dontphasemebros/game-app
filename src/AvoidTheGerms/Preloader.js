import Phaser from 'phaser';
import germ from './assets/germs.png';
import germJSON from './assets/germs.json';
import googlsl from './assets/goo.glsl';
import appear from './assets/sounds/appear.mp3';
import fail from './assets/sounds/fail.mp3';
import laugh from './assets/sounds/laugh.mp3';
import music from './assets/sounds/music.mp3';
import pickup from './assets/sounds/pickup.mp3';
import start from './assets/sounds/start.mp3';
import victory from './assets/sounds/victory.mp3';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.add.image(400, 300, 'background').setScale(2);

    this.loadText = this.add.text(400, 300, 'Loading ...', 80).setOrigin(0.5);

    this.load.atlas('assets', germ, germJSON);
    this.load.glsl('goo', googlsl);

    //  Audio ...

    this.load.audio('appear', appear);
    this.load.audio('fail', fail);
    this.load.audio('laugh', laugh);
    this.load.audio('music', music);
    this.load.audio('pickup', pickup);
    this.load.audio('start', start);
    this.load.audio('victory', victory);
  }

  create() {
    //  Create our global animations

    this.anims.create({
      key: 'germ1',
      frames: this.anims.generateFrameNames('assets', { prefix: 'red', start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'germ2',
      frames: this.anims.generateFrameNames('assets', { prefix: 'green', start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'germ3',
      frames: this.anims.generateFrameNames('assets', { prefix: 'blue', start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'germ4',
      frames: this.anims.generateFrameNames('assets', { prefix: 'purple', start: 1, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    if (this.sound.locked) {
      this.loadText.setText('Click to Start');

      this.input.once('pointerdown', () => {
        this.scene.start('MainMenu');
      });
    } else {
      this.scene.start('MainMenu');
    }
  }
}
