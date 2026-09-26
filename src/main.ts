import * as Phaser from 'phaser';

class MainScene extends Phaser.Scene{
  constructor(){
    super("MainScene");
  }

  create(){
    this.add.text(400,200, "Machine Uprising", {fontSize: "40px", color: "#000000"}).setOrigin(0.5);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width:800,
  height:600,
  backgroundColor: "#ffffff",
  scene: MainScene
};

const game = new Phaser.Game(config);