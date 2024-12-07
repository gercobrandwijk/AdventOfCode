import * as _ from "lodash";
import { end, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 6 },
    { file: "input", answer: undefined },
  ],
  1
);

setConfigLogging(true);

let lines = readAsLines("06", execution);

enum Dir {
  N,
  E,
  S,
  W,
}

interface Pos {
  x: number;
  y: number;
}

interface PosWithDir extends Pos {
  dir: Dir;
}

enum Result {
  Loop,
  Edge,
}

let startingPosition: Pos;
let startingDirection = Dir.N;

let grid: string[][] = [];

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[0].length; x++) {
    let value = lines[y][x];

    if (!grid[y]) grid[y] = [];

    grid[y][x] = value;

    if (value === "^") {
      startingPosition = { x, y };
    }
  }
}

let writeGrid = () => {
  for (let y = 0; y < grid.length; y++) {
    console.log(grid[y].join(" "));
  }
};

let allowed = (x, y) => {
  return grid[y][x] !== "#";
};

let rotate = (posWithDir: PosWithDir) => {
  switch (posWithDir.dir) {
    case Dir.N:
      posWithDir.dir = Dir.E;
      break;
    case Dir.E:
      posWithDir.dir = Dir.S;
      break;
    case Dir.S:
      posWithDir.dir = Dir.W;
      break;
    case Dir.W:
      posWithDir.dir = Dir.N;
      break;
  }
};

let setStep = (posWithDir: PosWithDir) => {
  switch (posWithDir.dir) {
    case Dir.N:
      if (!allowed(posWithDir.x, posWithDir.y - 1)) {
        rotate(posWithDir);

        setStep(posWithDir);
      } else {
        posWithDir.y--;
      }

      break;
    case Dir.E:
      if (!allowed(posWithDir.x + 1, posWithDir.y)) {
        rotate(posWithDir);

        setStep(posWithDir);
      } else {
        posWithDir.x++;
      }

      break;
    case Dir.S:
      if (!allowed(posWithDir.x, posWithDir.y + 1)) {
        rotate(posWithDir);

        setStep(posWithDir);
      } else {
        posWithDir.y++;
      }

      break;
    case Dir.W:
      if (!allowed(posWithDir.x - 1, posWithDir.y)) {
        rotate(posWithDir);

        setStep(posWithDir);
      } else {
        posWithDir.x--;
      }

      break;
  }
};

let move = (
  curr: PosWithDir,
  route: { [key: string]: boolean }
): {
  result: Result;
  position: Pos;
  route: { [key: string]: boolean };
} => {
  let next: PosWithDir = {
    x: curr.x,
    y: curr.y,
    dir: curr.dir,
  };

  setStep(next);

  if (route[next.x + "," + next.y + "," + next.dir]) {
    return { result: Result.Loop, position: next, route };
  }

  route[next.x + "," + next.y + "," + next.dir] = true;

  if (
    next.x === 0 ||
    next.y === 0 ||
    next.x === grid[0].length - 1 ||
    next.y === grid.length - 1
  ) {
    return { result: Result.Edge, position: next, route };
  }

  return move(next, route);
};

let originalRoute: { [key: string]: boolean } = {};
let originalPath = move(
  {
    x: startingPosition.x,
    y: startingPosition.y,
    dir: startingDirection,
  },
  originalRoute
);

let startingPoint = {
  x: startingPosition.x,
  y: startingPosition.y,
  dir: startingDirection,
};

let loops: { [key: string]: boolean } = {};

for (let originalRoutePoint in originalRoute) {
  let originalRoutePointParts = originalRoutePoint.split(",");

  let blockade: PosWithDir = {
    x: Number(originalRoutePointParts[0]),
    y: Number(originalRoutePointParts[1]),
    dir: Number(originalRoutePointParts[2]),
  };

  if (loops[blockade.x + "," + blockade.y]) {
    continue;
  }

  grid[blockade.y][blockade.x] = "#";

  let currentPath = move(startingPoint, {});

  if (currentPath.result === Result.Loop) {
    loops[blockade.x + "," + blockade.y] = true;
  }

  grid[blockade.y][blockade.x] = ".";
}

let answer = Object.keys(loops).length;

end(time, answer, execution);
