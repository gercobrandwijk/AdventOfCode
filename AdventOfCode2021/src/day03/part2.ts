import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 230 },
        { file: "input", answer: 3385170 },
    ],
    false
);

let lines = readAsLines("03", execution);

enum Mode {
    MostCommon,
    LeastCommon
}

function findByPosition(lines: string[], position: number, mode: Mode): string {
    let counterZero = 0;
    let counterOne = 0;

    for (let line of lines) {
        if (line[position] === '0') {
            counterZero++;
        } else if (line[position] === '1') {
            counterOne++;
        }
    }

    switch (mode) {
        case Mode.MostCommon:
            if (counterZero > counterOne) {
                return '0';
            } else if (counterZero < counterOne) {
                return '1';
            } else {
                return '1';
            }
        case Mode.LeastCommon:
            if (counterZero > counterOne) {
                return '1';
            } else if (counterZero < counterOne) {
                return '0';
            } else {
                return '0';
            }
    }
}

let binaryOxygen = '';
let binaryOxygenLines = lines;
let binaryCo2 = '';
let binaryCo2Lines = lines;

while (binaryOxygenLines.length > 1) {
    binaryOxygen += findByPosition(binaryOxygenLines, binaryOxygen.length, Mode.MostCommon);

    binaryOxygenLines = binaryOxygenLines.filter(x => x.startsWith(binaryOxygen));
}

while (binaryCo2Lines.length > 1) {
    binaryCo2 += findByPosition(binaryCo2Lines, binaryCo2.length, Mode.LeastCommon);

    binaryCo2Lines = binaryCo2Lines.filter(x => x.startsWith(binaryCo2));
}

let answer = parseInt(binaryOxygenLines[0], 2) * parseInt(binaryCo2Lines[0], 2);

end(time, answer, execution);
