import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 195 },
        { file: "input", answer: 220 },
    ],
    false
);

let lines = readAsLines("11", execution);

class Octopus {
    private flashed: boolean = false;
    private neighbours: Octopus[] = [];

    constructor(private value: number) {
    }

    setNeighbours(neighbours: Octopus[]) {
        this.neighbours = neighbours;
    }

    increase(): number {
        let flashCount = 0;

        if (!this.flashed) {
            this.value += 1;

            if (this.value > 9) {
                this.flashed = true;
                this.value = 0;

                flashCount++;

                for (let neighbour of this.neighbours) {
                    flashCount += neighbour.increase();
                }
            }
        }

        return flashCount;
    }

    reset(): boolean {
        if (!this.flashed) {
            return false;
        }

        this.flashed = false;

        this.value = 0;

        return true;
    }
}

function getNeighbours(rowIndex: number, columnIndex: number): Octopus[] {
    let positions = [
        { rowIndex: rowIndex - 1, columnIndex: columnIndex - 1 },
        { rowIndex: rowIndex - 1, columnIndex: columnIndex },
        { rowIndex: rowIndex - 1, columnIndex: columnIndex + 1 },

        { rowIndex: rowIndex, columnIndex: columnIndex - 1 },
        { rowIndex: rowIndex, columnIndex: columnIndex + 1 },

        { rowIndex: rowIndex + 1, columnIndex: columnIndex - 1 },
        { rowIndex: rowIndex + 1, columnIndex: columnIndex },
        { rowIndex: rowIndex + 1, columnIndex: columnIndex + 1 },
    ];

    return positions.map(x => {
        if (x.rowIndex < 0 || x.columnIndex < 0 || x.rowIndex > lines.length - 1 || x.columnIndex > lines[0].length - 1) {
            return null;
        }

        return map[x.rowIndex][x.columnIndex];
    }).filter(x => x);
}

let map: Octopus[][] = lines.map((row) => row.split('').map((column) => new Octopus(parseInt(column))));
map.forEach((row, rowIndex) => row.forEach((column, columnIndex) => column.setNeighbours(getNeighbours(rowIndex, columnIndex))));

let flashAmount = 0;
let stepCount = 0;

while (flashAmount < 100) {
    stepCount++;

    flashAmount = 0;

    map.forEach((row) => row.forEach((column) => column.increase()));
    map.forEach((row) => row.forEach((column) => flashAmount += column.reset() ? 1 : 0));
}

let answer = stepCount;

end(time, answer, execution);