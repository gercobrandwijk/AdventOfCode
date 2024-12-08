import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 3749 },
    { file: "input", answer: 945512582195 },
  ],
  1
);

setConfigLogging(false);

let lines = readAsLines("07", execution);

let rows = lines.map((x) => {
  let parts = x.split(": ");

  let row = {
    result: Number(parts[0]),
    values: parts[1].split(" ").map((y) => Number(y)),
  };

  return row;
});

enum Operation {
  Plus,
  Multiple,
}

let operations = [Operation.Plus, Operation.Multiple];

let calculate = (
  values: number[],
  index: number,
  value: number,
  result: number
): boolean => {
  for (let operation of operations) {
    let newValue = value;

    switch (operation) {
      case Operation.Plus:
        newValue += values[index];

        log(values, index, values[index], newValue, result, "plus");

        break;
      case Operation.Multiple:
        newValue *= values[index];

        log(values, index, values[index], newValue, result, "multiple");

        break;
    }

    if (index < values.length - 1) {
      let nestedResult = calculate(values, index + 1, newValue, result);

      if (nestedResult) {
        return true;
      }
    } else if (newValue === result) {
      return true;
    }
  }

  return false;
};

let validRows = rows.filter((x) => {
  let isValid = calculate(x.values, 1, x.values[0], x.result);

  if (isValid) {
    log("valid row", x.values, x.result);
  }

  return isValid;
});

let answer = _.sumBy(validRows, (x) => x.result);

end(time, answer, execution);
