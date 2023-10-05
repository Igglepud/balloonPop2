import Balloon from "/balloon.js";
import Cloud from "/cloud.js";
export default class gameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  //init
  init = function () {};

  preload = function () {};

  create = function () {
    const scene = this;

    console.log(this);
    this.score = 0;

    this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "72px" });
    this.scoreText.setDepth(100);
    this.gameTime = 60;
    this.timeText = this.add.text(1200, 10, "Time: 60", { fontSize: "72px" });
    this.timeText.setDepth(100);
    this.gameTimer = this.time.addEvent(
      {
        delay: Phaser.Math.Between(500, 2000),
        callbackScope: this,
        repeat: -1,
        callback: function () {
          //since the balloon is now its own class
          //with a constructor, we can use new Balloon()
          new Balloon(this);
        },
      },
      this
    );

    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callbackScope: this,
      callback: function () {
        this.gameTime--;
        this.timeText.setText("Time: " + this.gameTime);

        if (this.gameTime <= 0) {
          alert("Final score: " + this.score);
          //return to title screen
          this.scene.start('Title');
        }
      },
    });

    //create a random number of clouds for use in the game
    let numClouds = Phaser.Math.Between(2, 8);
    for (let i = 0; i < numClouds; i++) {
      new Cloud(this);
    }
  };

  update() {}
}
