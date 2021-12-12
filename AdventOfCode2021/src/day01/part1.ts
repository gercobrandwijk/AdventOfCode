import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 7 },
    { file: "input", answer: 1448 },
  ],
  false
);

let lines = readAsLines("01", execution);

let numbers = lines.map(x => parseInt(x));

function calculate(): number {
  let counter = 0;

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) {
      counter++;
    }
  }

  return counter;
}

let answer = calculate();

end(time, answer, execution);