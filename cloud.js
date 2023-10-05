export default class Cloud {
  constructor(scene) {
    this.scene = scene;
    //using an image instead of a sprite because this will
    //not be animated
    this.cloudImage = scene.physics.add.image(
      0,
      0,
      "cloud" + Phaser.Math.Between(1, 2)
    );
    this.cloudImage.setDepth(Phaser.Math.Between(1, 5));
    this.cloudImage.setScale(Phaser.Math.Between(0.5, 1.5));
    this.cloudImage.setVelocityX(Phaser.Math.Between(-100, -800));
    this.cloudImage.body.setAllowGravity(false);
    //making the cloud interactive will prevent clicking
    //balloons that are behind clouds
    this.cloudImage.setInteractive();
    //create timer to manage repositioning, clouds will be
    //recycled to save resources
    this.reposition();

    this.positionCheck = this.scene.time.addEvent({
      delay: 1000,
      callbackScope: this,
      repeat: -1,
      callback: function () {
        if (this.cloudImage.x < -400) {
          this.reposition();
        }
      },
    });
  }
  reposition() {
    this.cloudImage.setPosition(
      Phaser.Math.Between(1800, 2000),
      Phaser.Math.Between(100, 600)
    );
    this.cloudImage.setVelocityX(Phaser.Math.Between(-100, -800));
    if (Phaser.Math.Between(1, 2) == 1) {
      this.cloudImage.flipX = true;
    } else {
      this.cloudImage.flipX = false;
    }
    this.cloudImage.setScale(Phaser.Math.Between(0.5, 1.5));
  }
}
