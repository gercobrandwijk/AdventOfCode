import * as _ from "lodash";
import { end, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 41 },
    { file: "input", answer: 4647 },
  ],
  1
);

setConfigLogging(true);

let lines = readAsLines("06", execution);

enum Direction {
  North,
  East,
  South,
  West,
}

let position: { x: number; y: number };
let direction = Direction.North;

for (let y = 0; y < lines.length && !position; y++) {
  for (let x = 0; x < lines[0].length && !position; x++) {
    let value = lines[y][x];

    if (value === "^") {
      position = { x, y };
    }
  }
}

let visits = {};
visits[position.x + "," + position.y] = true;

let move = () => {
  let nextPosition = { x: position.x, y: position.y };

  switch (direction) {
    case Direction.North:
      nextPosition.y--;

      if (lines[nextPosition.y][nextPosition.x] === "#") {
        nextPosition.y = position.y;
        nextPosition.x++;

        direction = Direction.East;
      }
      break;
    case Direction.East:
      nextPosition.x++;

      if (lines[nextPosition.y][nextPosition.x] === "#") {
        nextPosition.x = position.x;
        nextPosition.y++;

        direction = Direction.South;
      }
      break;
    case Direction.South:
      nextPosition.y++;

      if (lines[nextPosition.y][nextPosition.x] === "#") {
        nextPosition.y = position.y;
        nextPosition.x--;

        direction = Direction.West;
      }
      break;
    case Direction.West:
      nextPosition.x--;

      if (lines[nextPosition.y][nextPosition.x] === "#") {
        nextPosition.x = position.x;
        nextPosition.y--;

        direction = Direction.North;
      }
      break;
  }

  if (!visits[nextPosition.x + "," + nextPosition.y]) {
    visits[nextPosition.x + "," + nextPosition.y] = true;
  }

  if (
    (nextPosition.x === 0 && direction === Direction.West) ||
    (nextPosition.y === 0 && direction === Direction.North) ||
    (nextPosition.x === lines[0].length - 1 && direction === Direction.East) ||
    (nextPosition.y === lines.length - 1 && direction === Direction.South)
  ) {
    return;
  }

  position = nextPosition;

  move();
};

move();

let answer = Object.keys(visits).length;

end(time, answer, execution);
