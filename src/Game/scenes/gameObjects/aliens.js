import Phaser from 'phaser';

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien');

    this.speed = Phaser.Math.GetSpeed(200, 1);
    this.orbiting = false;
    this.direction = 0;
    this.factor = 1;
    this.startingPoint = [0, 600];
    this.loc = 0;
  }

  isOrbiting() {
    return this.orbiting;
  }

  launch(shipX, shipY) {
    this.orbiting = true;
    this.setActive(true);
    this.setVisible(true);

    const xOrigin = Phaser.Math.RND.between(0, 800);
    const yOrigin = this.startingPoint[Math.floor(Math.random() * 2)];
    this.loc = yOrigin;

    this.setPosition(xOrigin, yOrigin);

    if (shipY > xOrigin) {
      const m = (shipY - yOrigin) / (shipX - xOrigin);
      this.direction = Math.atan(m);
    } else {
      this.factor = -1;
      const m = (yOrigin - shipY) / (xOrigin - shipX);
      this.direction = Math.atan(m);
    }

    this.angleRotation = Phaser.Math.RND.between(0.2, 0.9);
  }

  update(time, delta) {
    this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
    if (this.loc === 600) {
      this.y += -(this.speed * Math.floor(Math.random() * 10));
    } else {
      this.y += (this.speed * Math.floor(Math.random() * 10));
    }
    this.angle += this.angleRotation;

    if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }
}
