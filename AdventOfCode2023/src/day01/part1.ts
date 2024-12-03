import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 142 },
    { file: "input", answer: 54450 },
  ],
  1
);

let lines = readAsLines("01", execution);

let values = lines.map((line) => {
  let numbers = line.split("").filter((x) => !isNaN(x as unknown as number));

  return parseInt(numbers[0] + numbers[numbers.length - 1]);
});

let answer = values.reduce((prev, curr) => curr + prev, 0);

end(time, answer, execution);
