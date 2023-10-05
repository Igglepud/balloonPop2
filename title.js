export default class titleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  //init

  preload = function () {};

  create = function () {
    this.titleText = this.add.text(800, 500, "Balloon Pop", {
      fontSize: "128px",
    });
    //center the text
    this.titleText.setOrigin(0.5);
    this.clickText = this.add.text(800, 700, "Click to start", {
      fontSize: "72px",
    });
    //center text
    this.clickText.setOrigin(0.5);
    this.input.on(
      "pointerdown",
      function () {
        this.scene.start("Game");
      },
      this
    );

      //create blink
      this.tweens.add({
        targets: this.clickText,//thing to apply tween to
        alpha: 0, //you can put any number of properties here
        duration: 1000,//length of tween in miliseconds
        ease: "Power2",
        yoyo: true,//play in reverse after playing forward
        repeat: -1,//loop forever

      })


  };

  update() {}
}
