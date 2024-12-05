import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 123 },
    { file: "input", answer: 4260 },
  ],
  1
);

setConfigLogging(false);

let lines = readAsLines("05", execution);

let atRules = true;

let rules: { [key: number]: number[] } = {};
let updates: number[][] = [];

for (let line of lines) {
  if (line === "") {
    atRules = false;
    continue;
  }

  if (atRules) {
    let rule = line.split("|").map((x) => Number(x));

    if (!rules[rule[0]]) {
      rules[rule[0]] = [];
    }

    rules[rule[0]].push(rule[1]);
  } else {
    updates.push(line.split(",").map((x) => Number(x)));
  }
}

log("rules", rules);
log("updates", updates);

let middleValues = [];

for (let update of updates) {
  log("update", update);

  let isValidRecord = (record): { isValid: boolean; index?: number } => {
    for (let i = 0; i < record.length; i++) {
      let currentRules = rules[record[i]];

      if (!currentRules) {
        continue;
      }

      let beforeItems = record.slice(0, i);

      log(record[i], currentRules, beforeItems);

      if (currentRules.some((x) => beforeItems.indexOf(x) >= 0)) {
        return { isValid: false, index: i };
      }
    }

    return { isValid: true };
  };

  let isValid = isValidRecord(update).isValid;

  if (!isValid) {
    let validRecordResult: { isValid: boolean; index?: number };

    do {
      validRecordResult = isValidRecord(update);

      if (!validRecordResult.isValid) {
        let value = update[validRecordResult.index - 1];
        update[validRecordResult.index - 1] = update[validRecordResult.index];
        update[validRecordResult.index] = value;
      }
    } while (!validRecordResult.isValid);

    middleValues.push(update[Math.floor(update.length / 2)]);
  }

  log();
}

log("middleValues", middleValues);

let answer = _.sum(middleValues);

end(time, answer, execution);
