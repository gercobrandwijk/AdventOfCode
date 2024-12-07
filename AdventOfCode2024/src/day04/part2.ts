import * as _ from "lodash";
import { end, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 9 },
    { file: "input", answer: 2003 },
  ],
  1
);

setConfigLogging(false);

let isValidPosition = (grid, x, y) => {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
};

let getValue = (grid, x, y) => {
  return grid[x][y];
};

let matchesValue = (grid, x, y, character) => {
  if (!isValidPosition(grid, x, y)) return false;

  return getValue(grid, x, y) === character;
};

let searchHorizontal = (grid, x, y) => {
  if (!matchesValue(grid, x + 1, y - 1, "S")) return false;
  if (!matchesValue(grid, x + 1, y + 1, "S")) return false;
  if (!matchesValue(grid, x - 1, y - 1, "M")) return false;
  if (!matchesValue(grid, x - 1, y + 1, "M")) return false;

  return true;
};

let searchHorizontalReverse = (grid, x, y) => {
  if (!matchesValue(grid, x + 1, y - 1, "M")) return false;
  if (!matchesValue(grid, x + 1, y + 1, "M")) return false;
  if (!matchesValue(grid, x - 1, y - 1, "S")) return false;
  if (!matchesValue(grid, x - 1, y + 1, "S")) return false;

  return true;
};

let searchVertical = (grid, x, y) => {
  if (!matchesValue(grid, x - 1, y - 1, "M")) return false;
  if (!matchesValue(grid, x + 1, y - 1, "M")) return false;
  if (!matchesValue(grid, x + 1, y + 1, "S")) return false;
  if (!matchesValue(grid, x - 1, y + 1, "S")) return false;

  return true;
};

let searchVerticalReverse = (grid, x, y) => {
  if (!matchesValue(grid, x - 1, y - 1, "S")) return false;
  if (!matchesValue(grid, x + 1, y - 1, "S")) return false;
  if (!matchesValue(grid, x + 1, y + 1, "M")) return false;
  if (!matchesValue(grid, x - 1, y + 1, "M")) return false;

  return true;
};

let lines = readAsLines("04", execution);

let grid = lines;

let counter = 0;

for (let x = 0; x < grid[0].length; x++) {
  for (let y = 0; y < grid.length; y++) {
    if (matchesValue(grid, x, y, "A")) {
      if (searchHorizontal(grid, x, y)) counter++;
      else if (searchHorizontalReverse(grid, x, y)) counter++;
      else if (searchVertical(grid, x, y)) counter++;
      else if (searchVerticalReverse(grid, x, y)) counter++;
    }
  }
}

let answer = counter;

end(time, answer, execution);
