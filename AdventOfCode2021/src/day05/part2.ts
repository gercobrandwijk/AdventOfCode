import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 12 },
        { file: "input", answer: 22213 },
    ],
    false
);

let lines = readAsLines("05", execution);

class Segment {
    start: Point;
    end: Point;
}

class Point {
    x: number;
    y: number;
}

let segments: Segment[] = lines.map(x => {
    let startEnd = x.split(' -> ');

    let pointsStart = startEnd[0].split(',');
    let pointsEnd = startEnd[1].split(',');

    return {
        start: { x: parseInt(pointsStart[0]), y: parseInt(pointsStart[1]) },
        end: { x: parseInt(pointsEnd[0]), y: parseInt(pointsEnd[1]) }
    }
});

let map: number[][] = [];

let maxX = segments.reduce((x, y) => Math.max(Math.max(x, y.start.x), y.end.x), 0);
let maxY = segments.reduce((x, y) => Math.max(Math.max(x, y.start.y), y.end.y), 0);

for (let y = 0; y <= maxY; y++) {
    map[y] = [];
    for (let x = 0; x <= maxX; x++) {
        map[y].push(0);
    }
}

let crossed = 0;

for (let segment of segments) {
    let dirX = segment.start.x === segment.end.x ? 0 : segment.start.x < segment.end.x ? 1 : -1;
    let dirY = segment.start.y === segment.end.y ? 0 : segment.start.y < segment.end.y ? 1 : -1;

    let x = segment.start.x;
    let y = segment.start.y;

    let lastTime = false;

    while (true) {
        map[y][x] += 1;

        if (map[y][x] === 2) {
            crossed++;
        }

        if (lastTime) {
            break;
        }

        x += dirX;
        y += dirY;

        if (x === segment.end.x && y === segment.end.y) {
            lastTime = true;;
        }
    }
}

let answer = crossed;

end(time, answer, execution);
