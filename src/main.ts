import { Grid } from "./grid/Grid";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const RED = "#00ff11";
const LIGHT_BLUE = "#add8e6";

const BACKGROUND_COLOUR = RED;
 
// run after page loaded
addEventListener("load", () => {
  // ----- the screen -----
  // the game is drawn on the <canvas> element in index.html
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;

  // the "context" is what you draw with (Java calls this a Graphics object)
  const g = canvas.getContext("2d")!;

  // draw the screen
  // paint the whole canvas the background colour
  g.fillStyle = BACKGROUND_COLOUR;
  g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

// GRID TEST
const grid = new Grid(5, 9);
console.log("Grid created:", grid);

grid.placeHuman(2, 3, { name: "Test Human" });
console.log("After placing:", grid.getCell(2, 3));

grid.removeOccupant(2, 3);
console.log("After removing:", grid.getCell(2, 3));

//DRAW GRID 
const cellSize = 50;
g.strokeStyle = "black";

for (let r = 0; r < grid.rows; r++) {
  for (let c = 0; c < grid.cols; c++) {
    g.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
  }
}
});