import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 13140 },
        { file: "input", answer: 14920 },
    ],
    false
);

let lines = readAsLines("10", execution);

let registerX = 1;

let addOnNext = 0;
let cycleModulo = [];
let cycle = 0;

while (lines.length) {
    let line = lines.shift();

    let command = line.split(' ')[0];

    let addToRegister = 0;

    if (command === 'addx') {
        lines.unshift('noop');
        addToRegister = parseInt(line.split(' ')[1]);
    }

    cycle++

    if (cycle === 20 || (cycle + 20) % 40 === 0) {
        cycleModulo.push(registerX * cycle);
    }

    if (addOnNext) {
        registerX += addOnNext;
        addOnNext = 0;
    }

    if (addToRegister) {
        addOnNext = addToRegister;
    }
}

let answer = _.sum(cycleModulo);

end(time, answer, execution);
