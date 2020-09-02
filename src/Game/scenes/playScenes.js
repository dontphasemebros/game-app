import Phaser from 'phaser';
import Shoot from './gameObjects/shoot';
import Asteroid from './gameObjects/asteroids';
import backgroundy from '../assets/img/background.png';
import shipy from '../assets/img/spaceship.png';
import asteroidy from '../assets/img/asteroid.png';
import shooty from '../assets/img/2.png';
import kaboomy from '../assets/img/explode.png';
import lasery from '../assets/sounds/laser.wav';
import boomy from '../assets/sounds/darkShoot.wav';
import deathy from '../assets/sounds/Death.wav';
import scoreUpy from '../assets/sounds/Gold4.wav';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.gameOver = false;
    this.updatedScore = true;
    this.score = 0;
  }

  preload() {
    this.load.image('background', backgroundy);
    this.load.image('ship', shipy);
    this.load.image('asteroid', asteroidy);
    this.load.image('shoot', shooty);
    this.load.image('kaboom', kaboomy, 128, 128);
    this.load.audio('laser', lasery);
    this.load.audio('boom', boomy);
    this.load.audio('death', deathy);
    this.load.audio('scoreUp', scoreUpy);
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(500, 0, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(0, 400, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(500, 400, 'background').setOrigin(0, 0).setScale(0.6);

    this.ship = this.physics.add.image(400, 300, 'ship').setScale(0.1);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(200);
    this.ship.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shootsGroup = this.physics.add.group({
      classType: Shoot,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.asteroidsGroup = this.physics.add.group();

    this.asteroidsArray = [];

    this.asteroidTimedEvent = this.time.addEvent({
      delay: 1500,
      callback: this.addAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.explosions = this.add.group();

    this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShip, null, this);

    this.physics.add.overlap(this.shootsGroup, this.asteroidsGroup, this.collision, null, this);

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    });
  }

  update(time, delta) {
    const laser = this.sound.add('laser', {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    if (this.gameOver) {
      return;
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
    } else {
      this.ship.setAcceleration(0);
    }

    if (this.cursors.shift.isDown) {
      const shoot = this.shootsGroup.get();
      if (shoot) {
        shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);
        laser.play();
      }
    }

    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(300);
    } else {
      this.ship.setAngularVelocity(0);
    }

    this.asteroidsArray = this.asteroidsArray.filter((asteroid) => asteroid.active);

    // eslint-disable-next-line no-restricted-syntax
    for (const asteroid of this.asteroidsArray) {
      if (!asteroid.isOrbiting()) {
        asteroid.launch(this.ship.x, this.ship.y);
      }
      asteroid.update(time, delta);
    }
  }

  addAsteroid() {
    const asteroid = new Asteroid(this, 0, 0, 'asteroid', 0).setScale(0.02);
    this.asteroidsGroup.add(asteroid, true);
    this.asteroidsArray.push(asteroid);
  }

  hitShip() {
    const death = this.sound.add('death', {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    this.physics.pause();
    death.play();
    this.asteroidTimedEvent.paused = true;
    this.ship.setTint(0xff0000);
    this.gameOver = true;
    const userScore = this.score;
    setTimeout(() => {
      this.scene.start('gameOver', { score: userScore });
      this.score = 0;
      this.gameOver = false;
    }, 500);
  }

  collision(bullet, asteroid) {
    const boom = this.sound.add('boom', {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
    const explosion = this.explosions.create(asteroid.x, asteroid.y, 'kaboom');
    bullet.destroy();
    asteroid.destroy();
    boom.play();
    setTimeout(() => { explosion.destroy(); }, 250);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.score % 100 === 0) {
      this.playScoreSound = true;
    }

    if (this.score % 100 === 0) {
      const scoreUp = this.sound.add('scoreUp', {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      });
      if (this.playScoreSound) {
        scoreUp.play();
        this.playScoreSound = false;
      }
    }
  }
}
