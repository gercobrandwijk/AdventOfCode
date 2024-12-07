import * as _ from "lodash";
import { end, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 18 },
    { file: "input", answer: 2549 },
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

let matchesValue = (grid, x, y, searchQuery, searchIndex) => {
  if (!isValidPosition(grid, x, y)) return false;

  return getValue(grid, x, y) === searchQuery[searchIndex];
};

let search = (grid, x, y, moveX, moveY, searchQuery) => {
  if (!matchesValue(grid, x, y, searchQuery, 0)) {
    return 0;
  }

  return searchInternally(
    grid,
    x + moveX,
    y + moveY,
    moveX,
    moveY,
    searchQuery,
    1
  );
};

let searchInternally = (grid, x, y, moveX, moveY, searchQuery, searchIndex) => {
  if (!matchesValue(grid, x, y, searchQuery, searchIndex)) {
    return 0;
  }

  if (searchIndex >= searchQuery.length - 1) {
    return 1;
  }

  return searchInternally(
    grid,
    x + moveX,
    y + moveY,
    moveX,
    moveY,
    searchQuery,
    searchIndex + 1
  );
};

let lines = readAsLines("04", execution);

let grid = lines;

let searchQuery = "XMAS";
let counter = 0;

for (let x = 0; x < grid[0].length; x++) {
  for (let y = 0; y < grid.length; y++) {
    counter += search(grid, x, y, 1, 0, searchQuery); // horizontal
    counter += search(grid, x, y, -1, 0, searchQuery); // horizontal reverse
    counter += search(grid, x, y, 0, 1, searchQuery); // vertical
    counter += search(grid, x, y, 0, -1, searchQuery); // vertical reverse
    counter += search(grid, x, y, 1, 1, searchQuery); // diagonally ++
    counter += search(grid, x, y, -1, 1, searchQuery); // diagonally -+
    counter += search(grid, x, y, -1, -1, searchQuery); // diagonally --
    counter += search(grid, x, y, 1, -1, searchQuery); // diagonally +-
  }
}

let answer = counter;

end(time, answer, execution);
