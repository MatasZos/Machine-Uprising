import { Cell } from "./Cell";

export class Grid {
    rows: number;
    cols: number;
    cells: Cell[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];

        for (let r = 0; r < rows; r++) {
            const row: Cell[] = [];
            for (let c = 0; c < cols; c++) {
                row.push(new Cell());
            }
            this.cells.push(row);
        }
    }

    getCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }

    placeHuman(row: number, col: number, human: any): void {
        const cell = this.getCell(row, col);
        if (cell.isEmpty()) {
            cell.setOccupant(human);
        }
    }

    removeOccupant(row: number, col: number): void {
        const cell = this.getCell(row, col);
        cell.clear();
    }
}
