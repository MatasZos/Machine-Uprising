"use strict";
(() => {
  // src/grid/Cell.ts
  var Cell = class {
    occupant;
    constructor() {
      this.occupant = null;
    }
    setOccupant(o) {
      this.occupant = o;
    }
    clear() {
      this.occupant = null;
    }
    isEmpty() {
      return this.occupant === null;
    }
  };

  // src/grid/Grid.ts
  var Grid = class {
    rows;
    cols;
    cells;
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.cells = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push(new Cell());
        }
        this.cells.push(row);
      }
    }
    getCell(row, col) {
      return this.cells[row][col];
    }
    placeHuman(row, col, human) {
      const cell = this.getCell(row, col);
      if (cell.isEmpty()) {
        cell.setOccupant(human);
      }
    }
    removeOccupant(row, col) {
      const cell = this.getCell(row, col);
      cell.clear();
    }
  };

  // src/main.ts
  var SCREEN_WIDTH = 800;
  var SCREEN_HEIGHT = 600;
  var RED = "#00ff11";
  var BACKGROUND_COLOUR = RED;
  addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const g = canvas.getContext("2d");
    g.fillStyle = BACKGROUND_COLOUR;
    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    const grid = new Grid(5, 9);
    console.log("Grid created:", grid);
    grid.placeHuman(2, 3, { name: "Test Human" });
    console.log("After placing:", grid.getCell(2, 3));
    grid.removeOccupant(2, 3);
    console.log("After removing:", grid.getCell(2, 3));
    const cellSize = 50;
    g.strokeStyle = "black";
    for (let r = 0; r < grid.rows; r++) {
      for (let c = 0; c < grid.cols; c++) {
        g.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  });
})();
