import Phaser from 'phaser';
import Shoot from './gameObjects/shoot';
import Asteroid from './gameObjects/asteroids';
import backgroundy from '../assets/img/Space.jpg';
import shipy from '../assets/img/spaceship.png';
import asteroidy from '../assets/img/asteroid.png';
import shooty from '../assets/img/2.png';
import lasery from '../assets/sounds/laser.wav';
import boomy from '../assets/sounds/darkShoot.wav';
import deathy from '../assets/sounds/Death.wav';
import scoreUpy from '../assets/sounds/Gold4.wav';
import alieny from '../assets/img/enemy.png';
import rockety from '../assets/img/Rocket.png';
import Alien from './gameObjects/aliens';
import Rocket from './gameObjects/rockets';
import missiley from '../assets/sounds/5.wav';
import kaboom from '../assets/img/explodesheet.png';

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
    this.load.image('alien', alieny);
    this.load.image('rocket', rockety);
    this.load.audio('laser', lasery);
    this.load.audio('boom', boomy);
    this.load.audio('death', deathy);
    this.load.audio('scoreUp', scoreUpy);
    this.load.audio('missile', missiley);
    this.load.spritesheet('kaboom', kaboom, {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(500, 0, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(0, 400, 'background').setOrigin(0, 0).setScale(0.6);
    this.add.image(500, 400, 'background').setOrigin(0, 0).setScale(0.6);

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('kaboom', {
        start: 0,
        end: 15,
      }),
      frameRate: 16,
      repeat: 0,
      hideOnComplete: true,
    });

    this.ship = this.physics.add.image(400, 300, 'ship').setScale(0.1);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(150);
    this.ship.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shootsGroup = this.physics.add.group({
      classType: Shoot,
      maxSize: 1,
      runChildUpdate: true,
    });

    this.rocketsGroup = this.physics.add.group({
      classType: Rocket,
      maxSize: 5,
      runChildUpdate: true,
    });

    this.aliensGroup = this.physics.add.group();

    this.aliensArray = [];

    this.aliensTimedEvent = this.time.addEvent({
      delay: 1500,
      callback: this.addAlien,
      callbackScope: this,
      loop: true,
    });

    this.asteroidsGroup = this.physics.add.group();

    this.asteroidsArray = [];

    this.asteroidTimedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.addAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.explosions = this.add.group({
      defaultKey: 'kaboom',
      maxSize: 30,
    });

    this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShip, null, this);

    this.physics.add.overlap(this.ship, this.aliensGroup, this.hitShip, null, this);

    this.physics.add.overlap(this.shootsGroup, this.asteroidsGroup, this.collision, null, this);

    this.physics.add.overlap(this.shootsGroup, this.aliensGroup, this.collision, null, this);

    this.physics.add.overlap(this.rocketsGroup, this.asteroidsGroup, this.collision, null, this);

    this.physics.add.overlap(this.rocketsGroup, this.aliensGroup, this.collision, null, this);

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

    const missile = this.sound.add('missile', {
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

    if (this.cursors.space.isDown) {
      const shoot = this.shootsGroup.get();
      if (shoot) {
        shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);
        laser.play();
      }
    }

    if (this.cursors.shift.isDown) {
      const rocket = this.rocketsGroup.get();
      if (rocket) {
        rocket.fire(this.ship.x, this.ship.y, this.ship.rotation);
        missile.play();
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

    this.aliensArray = this.aliensArray.filter((alien) => alien.active);

    // eslint-disable-next-line no-restricted-syntax
    for (const alien of this.aliensArray) {
      if (!alien.isOrbiting()) {
        alien.launch(this.ship.x, this.ship.y);
      }
      alien.update(time, delta);
    }
  }

  addAsteroid() {
    const asteroid = new Asteroid(this, 0, 0, 'asteroid', 0).setScale(0.02);
    this.asteroidsGroup.add(asteroid, true);
    this.asteroidsArray.push(asteroid);
  }

  addAlien() {
    const alien = new Alien(this, 0, 0, 'alien', 0).setScale(0.15);
    this.aliensGroup.add(alien, true);
    this.aliensArray.push(alien);
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
    const explosion = this.explosions.get().setActive(true);
    explosion.setOrigin(0.5, 0.5);
    explosion.x = asteroid.x;
    explosion.y = asteroid.y;
    explosion.play('explode');
    bullet.destroy();
    asteroid.destroy();
    boom.play();
    // setTimeout(() => { explosion.destroy(); }, 250);
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
