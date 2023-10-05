export default class Balloon {
  //you must have a constructor in order to use "new balloon()" in another scene
  constructor(scene) {
    //attach the scene to the class for future reference
    this.scene = scene;
    //the class knows what scene is because in the game we pass scene to the constructor
    this.balloon = scene.add.sprite(
      0,
      0,
      "balloons",
      "balloon_0" + Phaser.Math.Between(1, 4)
    );
    this.balloon.setTint(Phaser.Math.Between(0x000000, 0xffffff));
    this.string = scene.add.sprite(
      0,
      this.balloon.y + this.balloon.height / 2,
      "balloons",
      "string_01"
    );
    //create a container to combine the string and balloon into one object
    this.container = scene.add.container(0, 0);
    this.container.setDepth(Phaser.Math.Between(1, 5));
    //add objects to the container
    this.container.add(this.balloon);
    this.container.add(this.string);
    //place balloon image above string, since it is now in a container
    //setting the depth will not work
    this.container.bringToTop(this.balloon);
    //give container physics and reposition
    scene.physics.add.existing(this.container);
    this.container.body.setAllowGravity(false);
    this.container.setPosition(Phaser.Math.Between(0, 1600), 1300);
    //apply velocity to the physics body to move balloon
    this.container.body.setVelocityY(Phaser.Math.Between(-100, -800));
    //random sizes for balloons
    this.container.setScale(Phaser.Math.Between(0.5, 1));

    //make balloon clickable
    this.balloon.setInteractive();
    this.balloon.on(
      "pointerdown",
      function () {
        //run the pop function and pass it the scene
        this.pop(this.scene);
      },
      this
    );

    //when animation is complete, destroy balloon
    this.balloon.on(
      "animationcomplete-pop",
      function () {
        this.balloon.destroy();
        //we also need to destroy the container and timer
        this.container.destroy();
        this.deleteTimer.destroy();
      },
      this
    );

    //create a timer for self-destruction of off-screen balloons
    this.deleteTimer = scene.time.addEvent({
      delay: 1000,
      callbackScope: this,
      repeat: -1,
      callback: function () {
        if (this.container.y < -100) {
          this.container.destroy();
          this.deleteTimer.destroy();
        }
      },
    });
  }
  //we can put functions after the constructor to keep code organized
  //can't click balloon twice
  pop(scene) {
    this.balloon.disableInteractive();
    //run animation
    this.balloon.play("pop");
    //update score variable
    scene.score += Phaser.Math.Between(100, 500);
    //update score on screen
    scene.scoreText.setText("Score: " + scene.score);
    this.string.destroy();
    scene.sound.play("balloonPop");
  }
}
