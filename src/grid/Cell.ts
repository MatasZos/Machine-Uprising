export class Cell {
    occupant: any;

    constructor() {
        this.occupant = null;
    }

    setOccupant(o: any): void {
        this.occupant = o;
    }

    clear(): void {
        this.occupant = null;
    }

    isEmpty(): boolean {
        return this.occupant === null;
    }
}
