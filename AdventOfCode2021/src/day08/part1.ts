import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 26 },
    { file: "input", answer: 330 },
  ],
  false
);


let lines = readAsLines("08", execution);

let segmentsPerDigit = [];
segmentsPerDigit[0] = 6;
segmentsPerDigit[1] = 2;
segmentsPerDigit[2] = 5;
segmentsPerDigit[3] = 5;
segmentsPerDigit[4] = 4;
segmentsPerDigit[5] = 5;
segmentsPerDigit[6] = 6;
segmentsPerDigit[7] = 3;
segmentsPerDigit[8] = 7;
segmentsPerDigit[9] = 6;

let items = lines.map(x => x.split(' | ')).map(x => ({ digits: x[0].split(' '), outputs: x[1].split(' ') }));

let simpleOutputCount = 0;

for (let item of items) {
  let count = item.outputs
    .filter(value => value.length === 2 || value.length === 4 || value.length === 3 || value.length === 7)
    .length;

  simpleOutputCount += count;
}

let answer = simpleOutputCount;

end(time, answer, execution);
