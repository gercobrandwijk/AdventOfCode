import * as _ from "lodash";
import { end, read, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 10 },
        { file: "input", answer: 1876 },
    ],
    false
);

let line = read("06", execution);

let answer = 0;

let startMessageLength = 4;

for (let i = startMessageLength - 1; i < line.length; i++) {
    let marker = {};

    for (let j = 0; j < startMessageLength; j++) {
        marker[line[i - j]] = 1;
    }

    if (Object.keys(marker).length === startMessageLength) {
        answer = i + 1;
        break;
    }
}

end(time, answer, execution);
