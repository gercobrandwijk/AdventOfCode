import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 198 },
        { file: "input", answer: 3882564 },
    ],
    false
);

let lines = readAsLines("03", execution);

function findMostAndLeastCommon(lines: string[]) {
    let binaryMostCommon = '';
    let binaryLeastCommon = '';

    for (let i = 0; i < lines[0].length; i++) {
        let counterZero = 0;
        let counterOne = 0;

        for (let line of lines) {
            if (line[i] === '0') {
                counterZero++;
            } else if (line[i] === '1') {
                counterOne++;
            }
        }

        if (counterZero > counterOne) {
            binaryMostCommon += '0';
        } else {
            binaryMostCommon += '1';
        }

        if (counterZero < counterOne) {
            binaryLeastCommon += '0';
        } else {
            binaryLeastCommon += '1';
        }
    }

    return { mostCommon: parseInt(binaryMostCommon, 2), leastCommon: parseInt(binaryLeastCommon, 2) };
}

let mostAndLeastCommon = findMostAndLeastCommon(lines);

let answer = mostAndLeastCommon.mostCommon * mostAndLeastCommon.leastCommon;

end(time, answer, execution);
