import Phaser from 'phaser';
import io from 'socket.io-client';
import ship from './assets/spaceShips_001.png';
import enemy from './assets/enemyBlack5.png';
import game from './assets/Gem3.gif';
import background from './assets/background.jpg';

class GameTwo extends Phaser.Scene {
  constructor() {
    super('GameTwo');
  }

  preload() {
    this.load.image('ship', ship);
    this.load.image('otherPlayer', enemy);
    this.load.image('star', game);
    this.load.image('background', background);
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0).setScale(0.6);
    this.add.image(0, 400, 'background').setOrigin(0).setScale(0.6);

    this.socket = io(process.env.DEVELOPMENT_CHAT || 'https://phaserbros.com');
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          this.addPlayer(players[id]);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });
    });
    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(playerInfo);
    });
    this.socket.on('disconnect', (playerId) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket.on('playerMoved', (playerInfo) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setRotation(playerInfo.rotation);
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.blueScoreText = this.add.text(16, 16, '', {
      fontSize: '32px',
      fill: '#0000FF',
    });

    this.redScoreText = this.add.text(584, 16, '', {
      fontSize: '32px',
      fill: '#FF0000',
    });

    this.socket.on('scoreUpdate', (scores) => {
      this.blueScoreText.setText(`Blue: ${scores.blue}`);
      this.redScoreText.setText(`Red:${scores.red}`);
    });

    this.socket.on('starLocation', (starLocation) => {
      if (this.star) this.star.destroy();
      this.star = this.physics.add.image(starLocation.x, starLocation.y, 'star');
      this.physics.add.overlap(this.ship, this.star, function () {
        this.socket.emit('starCollected');
      }, null, this);
    });
  }

  update() {
    if (this.ship) {
      if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-150);
      } else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(200);
      } else {
        this.ship.setAngularVelocity(0);
      }
      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(
          this.ship.rotation
          + 1.5, 100,
          this.ship.body.acceleration,
        );
      } else {
        this.ship.setAcceleration(0);
      }

      this.physics.world.wrap(this.ship, 5);
      const { x } = this.ship;
      const { y } = this.ship;
      const r = this.ship.rotation;

      if (this.ship.oldPosition && (
        x !== this.ship.oldPosition.x
        || y !== this.ship.oldPosition.y
        || r !== this.ship.oldPosition.rotation
      )) {
        this.socket.emit('playerMovement', {
          x: this.ship.x,
          y: this.ship.y,
          rotation: this.ship.rotation,
        });
      }

      this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation,
      };
    }
  }

  addPlayer(playerInfo) {
    this.ship = this.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      this.ship.setTint(0x0000ff);
    } else {
      this.ship.setTint(0xff0000);
    }
    this.ship.setDrag(100);
    this.ship.setAngularDrag(100);
    this.ship.setMaxVelocity(200);
  }

  addOtherPlayers(playerInfo) {
    const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x0000ff);
    } else {
      otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    this.otherPlayers.add(otherPlayer);
  }
}

export default GameTwo;
