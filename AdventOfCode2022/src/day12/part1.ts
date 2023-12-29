import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 31 },
        { file: "input", answer: undefined },
    ],
    false
);

let lines = readAsLines("12", execution);

class Point {
    nexts: Point[] = [];
    isStartPoint: boolean = false;
    isEndPoint: boolean = false;

    endReachable: boolean = null;
    endReachableIn: number = null;

    constructor(public x: number, public y: number, public value: string) {
        if (this.value === 'S') {
            this.isStartPoint = true;

            this.value = 'a';
        } else if (this.value === 'E') {
            this.isEndPoint = true;

            this.value = 'z';

            this.endReachable = true;
            this.endReachableIn = 0;
        }
    }

    getRawValue(): number {
        return this.value.charCodeAt(0) - 96;
    }

    linkIfValid(x: number, y: number) {
        if (this.isEndPoint) {
            return;
        }

        if (x < 0 || x >= maxWidth || y < 0 || y >= maxHeight) {
            return;
        }

        if (points[y][x].isStartPoint) {
            return;
        }

        if (this.isMoreOrEqual(points[y][x]))
            this.nexts.push(points[y][x])
    }

    isMoreOrEqual(nextPoint: Point) {
        return this.getRawValue() === nextPoint.getRawValue() || this.getRawValue() + 1 === nextPoint.getRawValue();
    }

    print(): string {
        return '[' + this.x + ',' + this.y + ']';
    }
}

let startPoint: Point;
let endPoint: Point;

let maxWidth = lines[0].length;
let maxHeight = lines.length;

let points = lines.map((row, y) => {
    return row.split('').map((column, x) => {
        let currentPoint = new Point(x, y, lines[y][x]);

        if (currentPoint.isStartPoint) {
            startPoint = currentPoint;
        } else if (currentPoint.isEndPoint) {
            endPoint = currentPoint;
        }

        return currentPoint;
    })
})

for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
        let currentPoint = points[y][x];

        currentPoint.linkIfValid(x - 1, y);
        currentPoint.linkIfValid(x + 1, y);
        currentPoint.linkIfValid(x, y - 1);
        currentPoint.linkIfValid(x, y + 1);
    }
}

function iterate(path: Point[]): number {
    let point: Point = path[path.length - 1];

    console.log(point.print(), 'currval=' + point.value, 'nextpointamount=' + point.nexts.length)

    if (point.endReachable == null) {
        for (let nextPoint of point.nexts) {
            if (path.indexOf(nextPoint) >= 0)
                continue;

            if (nextPoint.isEndPoint) {
                point.endReachable = true;
                point.endReachableIn = 1;
            } else {
                console.log('stepping into')
                let pathToEnd = iterate(path.concat(nextPoint))

                if ((pathToEnd != null && !point.endReachableIn) || (point.endReachableIn > pathToEnd + 1)) {
                    console.log('endreachable setted!');
                    point.endReachable = true;
                    point.endReachableIn = pathToEnd + 1;
                }
            }
        }
    }

    if (point.endReachable) {
        console.log('stepping out');
        return point.endReachableIn;
    }

    return null;
}

iterate([startPoint]);

let answer = startPoint.endReachableIn;

end(time, answer, execution);
