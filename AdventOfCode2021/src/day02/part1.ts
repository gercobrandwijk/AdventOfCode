import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 150 },
    { file: "input", answer: 1635930 },
  ],
  false
);

let lines = readAsLines("02", execution);

let commands = lines.map(x => {
  let parts = x.split(' ');

  let command = parts[0];
  let movement = parseInt(parts[1]);

  return { command, movement };
})

let position: { horizontal: number, depth: number } = { horizontal: 0, depth: 0 };

for (let command of commands) {
  switch (command.command) {
    case 'forward':
      position.horizontal += command.movement;
      break;
    case 'down':
      position.depth += command.movement;
      break;
    case 'up':
      position.depth -= command.movement;
      break;
  }
}

let answer = position.horizontal * position.depth;

end(time, answer, execution);
