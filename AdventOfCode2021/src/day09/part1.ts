import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 15 },
    { file: "input", answer: 607 },
  ],
  false
);

let lines = readAsLines("09", execution);

let borderChar = '@';
let heatmapWidth = lines[0].length;
let heatmapHeight = lines.length;

lines = lines.map(x => borderChar + x + borderChar);
lines.unshift(new Array(heatmapWidth + 2).fill(borderChar).join(''));
lines.push(new Array(heatmapWidth + 2).fill(borderChar).join(''));

let lowestNumbers = [];

for (let rowIndex = 1; rowIndex < heatmapHeight + 1; rowIndex++) {
  for (let columnIndex = 1; columnIndex < heatmapWidth + 1; columnIndex++) {
    let lowerOrEqualArounding = [
      lines[rowIndex - 1][columnIndex],
      lines[rowIndex][columnIndex + 1],
      lines[rowIndex + 1][columnIndex],
      lines[rowIndex][columnIndex - 1],
    ]
      .filter(x => x !== borderChar)
      .filter(x => x <= lines[rowIndex][columnIndex]);

    if (!lowerOrEqualArounding.length) {
      lowestNumbers.push(parseInt(lines[rowIndex][columnIndex]));
    }
  }
}

let answer = lowestNumbers.reduce((prev, curr) => prev += curr + 1, 0);

end(time, answer, execution);
