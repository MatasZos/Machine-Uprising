import Phaser from 'phaser';
import { Grid } from "./grid/Grid";
import { Shooter } from "./defenders/Shooter";

const GRID_ROWS = 5;
const GRID_COLS = 8;
const CELL_SIZE = 75;

const GRID_X = 100;
const GRID_Y = 100;

class MainScene extends Phaser.Scene {

  private grid!: Grid;
  private selectedDefender: string | null = null;

  constructor() {
    super('MainScene');
  }

  preload() {
    // temp image for defender
    this.load.image("player", "assets/learning/player.png");
  }

  private drawGrid() {

    const graphics = this.add.graphics();

    graphics.lineStyle(2, 0xffffff, 0.5);

    for (let row = 0; row < GRID_ROWS; row++) {

      for (let col = 0; col < GRID_COLS; col++) {

        const x = GRID_X + col * CELL_SIZE;
        const y = GRID_Y + row * CELL_SIZE;

        graphics.strokeRect(
          x,
          y,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
  }

  private drawToolbar() {
    const toolbarX = 100;
    const toolbarY = 20;

    const button = this.add.rectangle(toolbarX,toolbarY,150,40,0x333333);

    const label = this.add.text(toolbarX,toolbarY,"Shooter",{fontSize: "18px",color: "#ffffff"});

    button.setInteractive({ useHandCursor: true });

    button.on("pointerdown", () => {this.selectedDefender = "player";label.setColor("#00ff00");});
}

  private handleGridClick(pointer: Phaser.Input.Pointer) {

    // convert mouse position into grid column
    const col = Math.floor(
      (pointer.x - GRID_X) / CELL_SIZE
    );

    // convert mouse position into grid row
    const row = Math.floor(
      (pointer.y - GRID_Y) / CELL_SIZE
    );

    // ignore clicks outside grid
    if (
      row < 0 ||
      row >= GRID_ROWS ||
      col < 0 ||
      col >= GRID_COLS
    ) {
      return;
    }

    // get clicked cell
    const cell = this.grid.getCell(row, col);

    // don't allow two defenders in same cell
    if (!cell.isEmpty()) {
      return;
    }

    // find centre of clicked cell
    const defenderX =
      GRID_X + col * CELL_SIZE + CELL_SIZE / 2;

    const defenderY =
      GRID_Y + row * CELL_SIZE + CELL_SIZE / 2;

    // create shooter

    if (this.selectedDefender === null) {
      return;
    }

    const defender = new Shooter(
      this,
      defenderX,
      defenderY,
      this.selectedDefender
    );

    // store shooter in grid
    this.grid.placeHuman(
      row,
      col,
      defender
    );
  }

  create() {

    this.grid = new Grid(
      GRID_ROWS,
      GRID_COLS
    );

    this.drawGrid();
    this.drawToolbar();

    this.input.on(
      "pointerdown",
      this.handleGridClick,
      this
    );
  }
}

new Phaser.Game({

  type: Phaser.AUTO,

  width: 800,
  height: 600,

  backgroundColor: '#008409',

  parent: 'game-container',

  // allows projectiles to move
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [MainScene]

});