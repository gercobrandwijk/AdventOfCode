import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 143 },
    { file: "input", answer: 5374 },
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
  let isValid = true;

  log("update", update);

  for (let i = 0; i < update.length; i++) {
    let currentRules = rules[update[i]];

    let beforeItems = update.slice(0, i);

    log(update[i], currentRules, beforeItems);

    if (currentRules && currentRules.some((x) => beforeItems.indexOf(x) >= 0)) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    middleValues.push(update[Math.floor(update.length / 2)]);
  }

  log();
}

log("middleValues", middleValues);

let answer = _.sum(middleValues);

end(time, answer, execution);
