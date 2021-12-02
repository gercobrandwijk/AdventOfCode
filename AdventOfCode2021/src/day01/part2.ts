import * as fs from "fs";
import * as _ from "lodash";
import * as consola from "consola";

var time = new Date();

let day = "01";

// let input = fs.readFileSync("src/day" + day + "/_test.txt", {
//   encoding: "utf8",
// });
let input = fs.readFileSync("src/day" + day + "/_input.txt", {
  encoding: "utf8",
});

let numbers = input.split("\n").map((x) => parseInt(x, 10));

function calculate(): number {
  let counter = 0;

  for (let i = 0; i < numbers.length - 3; i++) {
    let sumCurrent = numbers[i] + numbers[i + 1] + numbers[i + 2];
    let sumNext = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];

    if (sumCurrent < sumNext) {
      counter++;
    }
  }

  // Speed improvement
  // for (let i = 0; i < numbers.length - 3; i++) {
  //   if (numbers[i] < numbers[i + 3]) {
  //     counter++;
  //   }
  // }

  return counter;
}

let answer = calculate();

consola.default.info("Answer: " + answer);

let validAnswer = 1471;

validAnswer
  ? answer === validAnswer
    ? consola.default.success("Valid")
    : consola.default.error("Not valid anymore, answer must be " + validAnswer)
  : consola.default.warn("No valid answer known yet");

let executionTime = new Date().getTime() - time.getTime();

console.info(executionTime + "ms");
console.log();

process.send(executionTime);
