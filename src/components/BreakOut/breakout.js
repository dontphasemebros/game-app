import Phaser from 'phaser';

import breakout from './assets/breakout.png';
import breakoutjson from './assets/breakout.json';

class BreakOut extends Phaser.Scene {
  constructor() {
    super('BreakOut');
    this.score = 0;
  }

  preload() {
    this.load.atlas('assets', breakout, breakoutjson);
  }

  create() {
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    });

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
      frameQuantity: 10,
      gridAlign: {
        width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100,
      },
    });

    this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

    //  Our colliders
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //  Input events
    this.input.on('pointermove', function (pointer) {
      //  Keep the paddle within the game
      this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

      if (this.ball.getData('onPaddle')) {
        this.ball.x = this.paddle.x;
      }
    }, this);

    this.input.on('pointerup', (() => {
      if (this.ball.getData('onPaddle')) {
        this.ball.setVelocity(-75, -300);
        this.ball.setData('onPaddle', false);
      }
    }), this);
  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);
    this.score += 50;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.bricks.countActive() === 0) {
      this.resetLevel();
    }
  }

  resetBall() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData('onPaddle', true);
  }

  resetLevel() {
    this.resetBall();
    window.idGame = 3;
    window.score = this.score;
    window.submitted = false;
    this.bricks.children.each((brick) => {
      brick.enableBody(false, 0, 0, true, true);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  hitPaddle(ball, paddle) {
    let diff = 0;

    if (ball.x < paddle.x) {
      //  Ball is on the left-hand side of the paddle
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
      //  Ball is on the right-hand side of the paddle
      diff = ball.x - paddle.x;
      ball.setVelocityX(10 * diff);
    } else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }

  update() {
    if (this.ball.y > 600) {
      this.resetBall();
    }
  }
}

export default BreakOut;
