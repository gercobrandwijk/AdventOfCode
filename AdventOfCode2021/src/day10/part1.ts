import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 26397 },
    { file: "input", answer: 394647 },
  ],
  false
);

let lines = readAsLines("10", execution);

let startingChars = ['(', '[', '{', '<'];
let endingChars = [')', ']', '}', '>'];

let invalidChars = [];

for (let line of lines) {
    let pairToClose: string[] = [];

    for (let char of line) {
        if (startingChars.indexOf(char) >= 0) {
            pairToClose.push(endingChars[startingChars.indexOf(char)]);
        } else if (endingChars.indexOf(char) >= 0) {
            let toClose = pairToClose[pairToClose.length - 1];

            if (toClose !== char) {
                invalidChars.push(char);

                break;
            } else {
                pairToClose.pop();
            }
        }
    }
}

let answer = invalidChars.reduce((prev, curr) => {
  switch (curr) {
    case ')':
      prev += 3;
      break;
    case ']':
      prev += 57;
      break;
    case '}':
      prev += 1197;
      break;
    case '>':
      prev += 25137;
      break;
  }

  return prev;
}, 0);

end(time, answer, execution);
