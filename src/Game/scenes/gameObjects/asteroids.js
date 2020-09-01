import Phaser from 'phaser';

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'asteroid');

    this.speed = Phaser.Math.GetSpeed(100, 1);
    this.orbiting = false;
    this.direction = 0;
    this.factor = 1;
  }

  isOrbiting() {
    return this.orbiting;
  }

  launch(shipX, shipY) {
    this.orbiting = true;
    this.setActive(true);
    this.setVisible(true);

    const xOrigin = Phaser.Math.RND.between(0, 800);
    const yOrigin = 0;

    this.setPosition(xOrigin, yOrigin);

    if (shipY > xOrigin) {
      const m = (shipY - yOrigin) / (shipX - xOrigin);
      this.direction = Math.atan(m);
    } else {
      this.factor = -1;
      const m = (shipY - yOrigin) / (xOrigin - shipX);
      this.direction = Math.atan(m);
    }

    this.angleRotation = Phaser.Math.RND.between(0.2, 0.9);
  }

  update(time, delta) {
    this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;
    this.angle += this.angleRotation;

    if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
