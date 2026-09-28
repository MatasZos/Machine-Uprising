import Phaser from 'phaser';
import { Grid } from "./grid/Grid";
import {Defender} from "./defenders/Defender";


const SPEED = 300; // pixels per second

const GRID_ROWS = 5;
const GRID_COLS = 8;
const CELL_SIZE = 75

const GRID_X = 100;
const GRID_Y = 100;



class MainScene extends Phaser.Scene {
  private grid!: Grid;

  constructor() {
    super('MainScene');
  }

  preload() {
    //temp image for defender
    this.load.image("player", "assets/learning/player.png");
  }

  private drawGrid(){
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff, 0.5);


    for(let row= 0; row< GRID_ROWS; row++){
        for(let col =0; col< GRID_COLS; col++){
            const x = GRID_X + col * CELL_SIZE;
            const y = GRID_Y + row * CELL_SIZE;

            graphics.strokeRect( x, y, CELL_SIZE, CELL_SIZE);

        }
    }
  }

  private handleGridClick(){
    //convert the mouse position into a grid column


    //convert the mosue position into a grid row


    // ignore any clicks outside of the grid


    //get the clicked cell


    //ensure no other defenders cna be put in the same cell;


    //find the centre of the clicked cell


    //create a defender at the chosen position


    //store the defender in the grid
  }

  create() {
    this.grid = new Grid(GRID_ROWS, GRID_COLS);


    this.drawGrid();

    this.input.on("pointerdown", this.handleGridClick, this);

  }



    
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#008409',
  parent: 'game-container',
  scene: [MainScene],
});