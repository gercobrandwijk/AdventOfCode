import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 900 },
        { file: "input", answer: 1781819478 },
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

let position: { horizontal: number, depth: number, aim: number } = { horizontal: 0, depth: 0, aim: 0 };

for (let command of commands) {
    switch (command.command) {
        case 'forward':
            position.horizontal += command.movement;

            position.depth += command.movement * position.aim;
            break;
        case 'down':
            position.aim += command.movement;
            break;
        case 'up':
            position.aim -= command.movement;
            break;
    }
}

let answer = position.horizontal * position.depth;

end(time, answer, execution);
