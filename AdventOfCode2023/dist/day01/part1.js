"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
let { time, execution } = (0, helpers_1.start)([
    { file: "test", answer: 142 },
    { file: "input", answer: 54450 },
], 1);
let lines = (0, helpers_1.readAsLines)("01", execution);
let values = lines.map((line) => {
    let numbers = line.split("").filter((x) => !isNaN(x));
    return parseInt(numbers[0] + numbers[numbers.length - 1]);
});
let answer = values.reduce((prev, curr) => curr + prev, 0);
(0, helpers_1.end)(time, answer, execution);
//# sourceMappingURL=part1.js.map