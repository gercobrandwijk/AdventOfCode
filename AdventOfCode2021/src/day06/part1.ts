import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 5934 },
    { file: "input", answer: 365862 },
  ],
  false
);

let lines = readAsLines("06", execution);

let fishes = lines[0].split(',').map(x => parseInt(x));

let amountOfDays = 80;

for (let i = 0; i < amountOfDays; i++) {
  let amountOfFishes = fishes.length
  for (let fishIndex = 0; fishIndex < amountOfFishes; fishIndex++) {
    if (fishes[fishIndex] > 0) {
      fishes[fishIndex]--;
    }
    else if (fishes[fishIndex] === 0) {
      fishes[fishIndex] = 6;
      fishes.push(8);
    }
  }
}

let answer = fishes.length;

end(time, answer, execution);
