import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 21 },
        { file: "input", answer: 1711 },
    ],
    false
);

let lines = readAsLines("08", execution);

let grid = lines.map(x => x.split('').map(y => parseInt(y)));

let visibleTrees = 0;

grid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
        let hiddenFromTop = false;
        for (let i = rowIndex - 1; i >= 0; i--) {
            if (grid[i][columnIndex] >= value) {
                hiddenFromTop = true;

                break;
            }
        }

        let hiddenFromBottom = false;
        for (let i = rowIndex + 1; i < grid.length; i++) {
            if (grid[i][columnIndex] >= value) {
                hiddenFromBottom = true;

                break;
            }
        }

        let hiddenFromLeft = false;
        for (let i = columnIndex - 1; i >= 0; i--) {
            if (grid[rowIndex][i] >= value) {
                hiddenFromLeft = true;

                break;
            }
        }

        let hiddenFromRight = false;
        for (let i = columnIndex + 1; i < row.length; i++) {
            if (grid[rowIndex][i] >= value) {
                hiddenFromRight = true;

                break;
            }
        }

        if (!hiddenFromTop || !hiddenFromBottom || !hiddenFromLeft || !hiddenFromRight) {
            visibleTrees++
        }
    })
})

let answer = visibleTrees;

end(time, answer, execution);
