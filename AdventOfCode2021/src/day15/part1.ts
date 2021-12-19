import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 40 },
        { file: "input", answer: 748 },
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

let pointsFlat: Point[] = [];

for (let y = 0; y < points.length; y++) {
    for (let x = 0; x < points[0].length; x++) {
        pointsFlat.push(points[y][x]);

        if (y > 0) {
            points[y][x].children.push(points[y - 1][x]);
        }

        if (y < points.length - 1) {
            points[y][x].children.push(points[y + 1][x]);
        }

        if (x > 0) {
            points[y][x].children.push(points[y][x - 1]);
        }

        if (x < points[0].length - 1) {
            points[y][x].children.push(points[y][x + 1]);
        }

        points[y][x].children.sort((x, y) => x.value - y.value);
    }
}

points[0][0].weight = 0;

let startPoint = points[0][0];
let endpoint = points[points.length - 1][points[0].length - 1];

let queue: Point[] = [];
queue.push(startPoint);

while (queue.length) {
    queue.sort((x, y) => y.weight - x.weight);

    let lowest = queue.pop();

    if (queue.length === 0 && lowest === endpoint) {
        break;
    }

    lowest.visited = true;

    for (let child of lowest.children) {
        if (child.visited) {
            continue;
        }

        if (!child.weight) {
            child.weight = lowest.weight + child.value;

            child.previous = lowest;

            child.visited = true;

            if (queue.indexOf(child) < 0) {
                queue.push(child);
            }
        } else if (lowest.weight + child.value < child.weight) {
            child.weight = lowest.weight + child.value;

            child.previous = lowest;

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
