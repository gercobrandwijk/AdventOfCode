import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 2 },
    { file: "input", answer: 321 },
  ],
  1
);

setConfigLogging(false);

let lines = readAsLines("02", execution);

enum Mode {
  Unknown,
  Increasing,
  Decreasing,
}

let isSafeRow = (values) => {
  let isSafe = true;

  if (values[0] === values[1]) {
    isSafe = false;

    return isSafe;
  }

  let mode = values[0] > values[1] ? Mode.Decreasing : Mode.Increasing;

  for (let i = 1; i < values.length; i++) {
    let currentValue = values[i];
    let previousValue = values[i - 1];

    switch (mode) {
      case Mode.Decreasing:
        // not all decreasing
        if (currentValue > previousValue) {
          isSafe = false;

          log("stopped at " + currentValue);

          return isSafe;
        }
        // less than 1 different
        else if (currentValue >= previousValue) {
          isSafe = false;

          log("stopped at " + currentValue + " because less than 1 different");

          return isSafe;
        }
        // more than 3 different
        else if (Math.abs(currentValue - previousValue) > 3) {
          isSafe = false;

          log("stopped at " + currentValue + " because more than 3 different");

          return isSafe;
        }

        break;
      case Mode.Increasing:
        // not all increasing
        if (currentValue < previousValue) {
          isSafe = false;

          log("stopped at " + currentValue);

          return isSafe;
        }
        // less than 1 different
        else if (currentValue <= previousValue) {
          isSafe = false;

          log("stopped at " + currentValue + " because less than 1 different");

          return isSafe;
        }
        // more than 3 different
        else if (Math.abs(currentValue - previousValue) > 3) {
          isSafe = false;

          log("stopped at " + currentValue + " because more than 3 different");

          return isSafe;
        }

        break;
    }
  }

  return isSafe;
};

let answer = lines.filter((line, rowIndex) => {
  let values = line.split(" ").map((x) => parseInt(x));

  let isSafe = isSafeRow(values);

  log("Row " + rowIndex + ": " + (isSafe ? "safe" : "unsafe"));

  return isSafe;
}).length;

end(time, answer, execution);
