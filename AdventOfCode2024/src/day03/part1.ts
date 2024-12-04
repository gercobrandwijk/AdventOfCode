import * as _ from "lodash";
import { end, log, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 161 },
    { file: "input", answer: 161085926 },
  ],
  1
);

setConfigLogging(true);

let lines = readAsLines("03", execution);

let allData = lines.join();

let answer = allData
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
