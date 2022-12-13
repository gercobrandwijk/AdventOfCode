import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: '##..##..##..##..##..##..##..##..##..##..\r\n###...###...###...###...###...###...###.\r\n####....####....####....####....####....\r\n#####.....#####.....#####.....#####.....\r\n######......######......######......####\r\n#######.......#######.......#######.....' },
        { file: "input", answer: '###..#..#..##...##...##..###..#..#.####.\r\n#..#.#..#.#..#.#..#.#..#.#..#.#..#....#.\r\n###..#..#.#....#..#.#....###..#..#...#..\r\n#..#.#..#.#....####.#....#..#.#..#..#...\r\n#..#.#..#.#..#.#..#.#..#.#..#.#..#.#....\r\n###...##...##..#..#..##..###...##..####.' },
    ],
    false
);

let lines = readAsLines("10", execution);

let registerX = 1;

let addOnNext = 0;
let crtOutput = '';
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

    let cycleModuloRegister = cycle;

    while (cycleModuloRegister > 40)
        cycleModuloRegister -= 40;

    if (cycleModuloRegister >= registerX && cycleModuloRegister <= registerX + 2) {
        crtOutput += '#';
    } else {
        crtOutput += '.';
    }

    if (addOnNext) {
        registerX += addOnNext;
        addOnNext = 0;
    }

    if (addToRegister) {
        addOnNext = addToRegister;
    }
}

let chunked = _.chunk(crtOutput, 40);

let answer = chunked.reduce((prev, curr) => prev + '\r\n' + curr.join(''), '').trim();

end(time, answer, execution);
