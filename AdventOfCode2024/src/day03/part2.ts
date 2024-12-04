import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test2", answer: 48 },
    { file: "input", answer: 82045421 },
  ],
  1
);

setConfigLogging(true);

let lines = readAsLines("03", execution);

let allData = "do()" + lines.join();

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

let indexes1 = getAllIndexes(allData, "do()").map((x) => ({ index: x, mode: 1 }));
let indexes2 = getAllIndexes(allData, "don't()").map((x) => ({
  index: x,
  mode: 0,
}));

let switches = _.sortBy([...indexes1].concat(indexes2), (x) => x.index).filter(
  (item, index, values) => {
    if (index > 0) {
      if (values[index - 1].mode === item.mode) return false;
    }

    return true;
  }
);

let allDataFiltered = "";

for (let i = 0; i < switches.length; i += 2) {
  if (i + 1 < switches.length) {
    allDataFiltered += allData.slice(switches[i].index, switches[i + 1].index);
  } else {
    allDataFiltered += allData.slice(switches[i].index);
  }
}

let answer = allDataFiltered
  .split("mul(")
  .filter((x) => x.indexOf(")") >= 0)
  .map((x) => x.slice(0, x.indexOf(")")))
  .filter((x) => {
    let leftPlusRight = x.split(",").map((y) => Number(y));

    return !(isNaN(leftPlusRight[0]) || isNaN(leftPlusRight[1]));
  })
  .map((x) => {
    let leftPlusRight = x.split(",").map((y) => Number(y));

    return leftPlusRight[0] * leftPlusRight[1];
  })
  .reduce((sum, curr) => curr + sum, 0);

end(time, answer, execution);
