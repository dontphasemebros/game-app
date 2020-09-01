import Phaser from 'phaser';
import background from '../assets/img/Space.jpg';
import logo from '../assets/img/GTL G.png';
import speaker from '../assets/img/speaker.png';
import loading from '../assets/sounds/Ballistics.mp3';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload');

    this.count = 0;
  }

  preload() {
    this.load.image('background', background);
    this.load.image('logo', logo);
    this.load.image('speaker', speaker);
    this.load.audio('loading', loading);
  }

  create() {
    const music = this.sound.add('loading', {
      mute: false,
      volume: 0.15,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(400, 200, 'logo').setScale(2);
    this.add.image(780, 580, 'speaker').setScale(0.1).setInteractive({ useHandCursor: true }).on('pointerdown', () => music.play());
    this.add.text(120, 350, 'Don\'t Phase Me Bros Asteroids', {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    });
    this.add.text(225, 400, 'Click Here To Play!', {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('PlayScene'));
  }
}

export default PreloadScene;
