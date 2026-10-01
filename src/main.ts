import Phaser from 'phaser';
import { Grid } from "./grid/Grid";
import {Defender} from "./defenders/Defender";
import {Shooter} from "./defenders/Shooter";


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

  private handleGridClick(pointer: Phaser.Input.Pointer){
    //convert the mouse position into a grid column

    const col = Math.floor((pointer.x - GRID_X) / CELL_SIZE);


    //convert the mosue position into a grid row

    
    const row = Math.floor((pointer.y - GRID_Y) / CELL_SIZE);

    // ignore any clicks outside of the grid

    if( row<0 || row>=GRID_ROWS || col<0 || col>=GRID_COLS){
        return;
    }


    //get the clicked cell

    const cell = this.grid.getCell(row,col)


    //ensure no other defenders cna be put in the same cell;
    
    if (!cell.isEmpty()){
        return;
    }

    //find the centre of the clicked cell

    const defenderX = GRID_X + col * CELL_SIZE + CELL_SIZE /2

    const defenderY = GRID_Y + row * CELL_SIZE + CELL_SIZE /2



    //create a shooter at the chosen position

    const defender = new Shooter(
    this,
    defenderX,
    defenderY,
    "player"
);


    //store the defender in the grid

    this.grid.placeHuman(row,col,defender)
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