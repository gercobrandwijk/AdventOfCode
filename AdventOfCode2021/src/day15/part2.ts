import * as _ from "lodash";
import { end, readAsLines, start, timeStamp } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 315 },
        { file: "input", answer: 3045 },
    ],
    false
);

let lines = readAsLines("15", execution);

class Point {
    children: Point[] = [];

    visited: boolean = false;

    weight: number = null;

    previous: Point = null;

    constructor(public value: number) {
    }
}

let points = lines.map(x => x.split('').map(y => new Point(parseInt(y))));

let rowCount = points.length;
let columnCount = points[0].length;

for (let i = 1; i < 5; i++) {
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            let newValue = points[y][x].value + i;

            if (newValue > 9)
                newValue -= 9;

            points[y].push(new Point(newValue));
        }
    }
}

columnCount = columnCount * 5;

for (let i = 1; i < 5; i++) {
    for (let y = 0; y < rowCount; y++) {
        let newRow = [];

        for (let x = 0; x < columnCount; x++) {
            let newValue = points[y][x].value + i;

            if (newValue > 9)
                newValue -= 9;

            newRow.push(new Point(newValue));
        }

        points.push(newRow);
    }
}

rowCount = rowCount * 5;

for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < columnCount; x++) {
        if (y > 0) {
            points[y][x].children.push(points[y - 1][x]);
        }

        if (y < rowCount - 1) {
            points[y][x].children.push(points[y + 1][x]);
        }

        if (x > 0) {
            points[y][x].children.push(points[y][x - 1]);
        }

        if (x < columnCount - 1) {
            points[y][x].children.push(points[y][x + 1]);
        }

        points[y][x].children.sort((x, y) => x.value - y.value);
    }
}

let startPoint = points[0][0];
let endpoint = points[rowCount - 1][columnCount - 1];

let queue: Point[] = [];
queue.push(startPoint);

while (queue.length) {
    queue.sort((x, y) => x.weight - y.weight);

    let current = queue.shift();

    if (queue.length === 0 && current === endpoint) {
        break;
    }

    current.visited = true;

    for (let child of current.children) {
        if (child.visited) {
            continue;
        }

        if (!child.weight) {
            child.weight = current.weight + child.value;

            child.previous = current;

            child.visited = true;

            if (queue.indexOf(child) < 0) {
                queue.push(child);
            }
        } else if (current.weight + child.value < child.weight) {
            child.weight = current.weight + child.value;

            child.previous = current;

            child.visited = true;

            if (queue.indexOf(child) < 0) {
                queue.push(child);
            }
        }
    }
}

var totalRisk = endpoint.value;
var reversePathPoint = endpoint.previous;

while (reversePathPoint) {
    totalRisk += reversePathPoint.value;

    reversePathPoint = reversePathPoint.previous;

    if (reversePathPoint === startPoint)
        break;
}

let answer = totalRisk;

end(time, answer, execution);