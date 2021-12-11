import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 288957 },
        { file: "input", answer: 2380061249 },
    ],
    false
);

let lines = readAsLines("10", execution);

let startingChars = ['(', '[', '{', '<'];
let endingChars = [')', ']', '}', '>'];

let invalidChars = [];

let incompleteLineScores = [];

for (let line of lines) {
    let pairToClose: string[] = [];

    let corrupt = false;

    for (let char of line) {
        if (startingChars.indexOf(char) >= 0) {
            pairToClose.push(endingChars[startingChars.indexOf(char)]);
        } else if (endingChars.indexOf(char) >= 0) {
            let toClose = pairToClose[pairToClose.length - 1];

            if (toClose !== char) {
                invalidChars.push(char);

                corrupt = true;

                break;
            } else {
                pairToClose.pop();
            }
        }
    }

    if (!corrupt) {
        if (pairToClose.length) {
            let score = 0;

            let lastPairToClose;
            while (lastPairToClose = pairToClose.pop()) {
                score *= 5;
                switch (lastPairToClose) {
                    case ')':
                        score += 1;
                        break;
                    case ']':
                        score += 2;
                        break;
                    case '}':
                        score += 3;
                        break;
                    case '>':
                        score += 4;
                        break;
                }
            }

            incompleteLineScores.push(score);
        }
    }
}

incompleteLineScores.sort((x, y) => x - y);

let answer = incompleteLineScores[Math.floor(incompleteLineScores.length / 2)];

end(time, answer, execution);
