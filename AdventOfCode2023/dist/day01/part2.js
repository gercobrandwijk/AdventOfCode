"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
let { time, execution } = (0, helpers_1.start)([
    { file: "test2", answer: 281 },
    { file: "input", answer: 54265 },
], 1);
let lines = (0, helpers_1.readAsLines)("01", execution);
let getNumbers = (value) => {
    let numbers = [];
    while (value.length > 0) {
        if (!isNaN(value[0])) {
            numbers.push(parseInt(value[0]));
        }
        else {
            let textNumbers = {
                one: 1,
                two: 2,
                three: 3,
                four: 4,
                five: 5,
                six: 6,
                seven: 7,
                eight: 8,
                nine: 9,
            };
            for (const [textNumberKey, textNumberValue] of Object.entries(textNumbers)) {
                if (value.startsWith(textNumberKey)) {
                    numbers.push(textNumberValue);
                    break;
                }
            }
        }
        value = value.substring(1);
    }
    return numbers;
};
let values = lines.map((line) => {
    let numbers = getNumbers(line);
    return parseInt(numbers[0] + "" + numbers[numbers.length - 1]);
});
let answer = values.reduce((prev, curr) => curr + prev, 0);
(0, helpers_1.end)(time, answer, execution);
//# sourceMappingURL=part2.js.map