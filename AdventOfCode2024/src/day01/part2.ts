import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 31 },
    { file: "input", answer: 26593248 },
  ],
  1
);

let lines = readAsLines("01", execution);

let records = lines.map((x) => {
  let row = x.split("   ");

  return [parseInt(row[0]), parseInt(row[1])];
});

let leftColumn = records.map((x) => x[0]).sort();
let rightColumn = records.map((x) => x[1]).sort();

let distances = leftColumn.map(
  (value) => value * rightColumn.filter((x) => x === value).length
);

let answer = distances.reduce((sum, current) => sum + current, 0);

end(time, answer, execution);
