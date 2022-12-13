import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 8 },
        { file: "input", answer: 301392 },
    ],
    false
);

let lines = readAsLines("08", execution);

let grid = lines.map(x => x.split('').map(y => parseInt(y)));

let highestScore = 0;

grid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
        let topScore = 0;
        for (let i = rowIndex - 1; i >= 0; i--) {
            topScore++;
            if (grid[i][columnIndex] >= value) {
                break;
            }
        }

        let bottomScore = 0;
        for (let i = rowIndex + 1; i < grid.length; i++) {
            bottomScore++;
            if (grid[i][columnIndex] >= value) {
                break;
            }
        }

        let leftScore = 0;
        for (let i = columnIndex - 1; i >= 0; i--) {
            leftScore++;
            if (grid[rowIndex][i] >= value) {
                break;
            }
        }

        let rightScore = 0;
        for (let i = columnIndex + 1; i < row.length; i++) {
            rightScore++;
            if (grid[rowIndex][i] >= value) {
                break;
            }
        }

        let score = [topScore, bottomScore, leftScore, rightScore].reduce((prev, current) => prev * current, 1);

        if (score > highestScore)
            highestScore = score;
    })
})

let answer = highestScore;

end(time, answer, execution);
