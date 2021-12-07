import * as _ from "lodash";
import { end, readFirstLineAsNumbers, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 168 },
        { file: "input", answer: 96798233 },
    ],
    false
);

let positions = readFirstLineAsNumbers("07", execution);
positions = positions.sort((x, y) => x - y);

let possiblePositions = [];
for (let i = positions[0]; i < positions[positions.length - 1]; i++) {
    possiblePositions.push(i + 1);
}

function calculateDistance(positions, value) {
    let sum = 0;

    for (let position of positions) {
        let distance = Math.abs(position - value);

        let fuel = Math.abs(distance / 2 * (1 - distance)) + distance;

        sum += fuel;
    }

    return sum;
}

let currentPositions = positions;

let index = Math.floor(possiblePositions.length / 2);

let lowestDistance = calculateDistance(currentPositions, possiblePositions[index]);

while (true) {
    let currentDistance = calculateDistance(currentPositions, possiblePositions[index]);

    let leftDistance = calculateDistance(currentPositions, possiblePositions[index - 1]);
    let rightDistance = calculateDistance(currentPositions, possiblePositions[index + 1]);

    if (currentDistance < lowestDistance) {
        lowestDistance = currentDistance;
    }

    if (leftDistance < currentDistance) {
        index--;
    } else if (rightDistance < currentDistance) {
        index++;
    } else {
        break;
    }
}


let answer = lowestDistance;

end(time, answer, execution);
