import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 26984457539 },
    { file: "input", answer: 1653250886439 },
  ],
  false
);

let lines = readAsLines("06", execution);

let fishes = lines[0].split(',').map(x => parseInt(x));

let indexRefresh = 6;
let indexNew = 8;

let data = [];

for (let i = 0; i <= indexNew; i++) {
  data[i] = fishes.filter(x => x === i).length;
}

let amountOfDays = 256;

for (let dayIndex = 0; dayIndex < amountOfDays; dayIndex++) {
  let amountRefresh = data[0];
  let amountNew = data[0];

  for (let dataIndex = 0; dataIndex < indexNew; dataIndex++) {
    data[dataIndex] = data[dataIndex + 1];
  }

  data[indexRefresh] += amountRefresh;
  data[indexNew] = amountNew;
}

let answer = data.reduce((prev, curr) => prev += curr, 0);

end(time, answer, execution);

