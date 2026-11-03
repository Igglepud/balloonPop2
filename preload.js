class preloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  //init
  init = function () {
    console.log("preload");
  };

  preload = function () {

    this.load.audio("balloonPop", "assets/sounds/pop.wav");

    this.load.atlas(
      "balloons",
      "/assets/images/balloons.png",
      "/assets/images/balloons.json"
    );

    this.load.image("cloud1", "/assets/images/cloud1.png");
    this.load.image("cloud2", "/assets/images/cloud2.png");
  };

  create = function () {
    //create animations from atlas
    this.anims.create({
      key: "pop",
      frames: this.anims.generateFrameNames("balloons", {
        prefix: "balloon_explode_0",
        start: 1,
        end: 6,
      }),
      repeat: 0,
      frameRate: 15,
    });

    this.scene.start("Title");
  };

  update() { }
}
