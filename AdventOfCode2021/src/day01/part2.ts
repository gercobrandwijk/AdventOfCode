import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 5 },
    { file: "input", answer: 1471 },
  ],
  false
);

let lines = readAsLines("01", execution);

let numbers = lines.map(x => parseInt(x));

function calculate(): number {
  let counter = 0;

  for (let i = 0; i < numbers.length - 3; i++) {
    let sumCurrent = numbers[i] + numbers[i + 1] + numbers[i + 2];
    let sumNext = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];

    if (sumCurrent < sumNext) {
      counter++;
    }
  }

  return counter;
}

let answer = calculate();

end(time, answer, execution);