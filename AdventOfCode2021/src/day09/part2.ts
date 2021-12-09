import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 1134 },
        { file: "input", answer: 900864 },
    ],
    false
);

let lines = readAsLines("09", execution);

let borderChar = '@';
let heatmapWidth = lines[0].length;
let heatmapHeight = lines.length;

lines = lines.map(x => borderChar + x + borderChar);
lines.unshift(new Array(heatmapWidth + 2).fill(borderChar).join(''));
lines.push(new Array(heatmapWidth + 2).fill(borderChar).join(''));

class Point {
    key: string;
    isDeepest: boolean;
    value: number;
    links: Point[];
    parentDeepest?: Point;
}

function createKey(rowIndex: number, columnIndex: number): string {
    return rowIndex + '_' + columnIndex;
}

function getAroundings(rowIndex: number, columnIndex: number): { rowIndex: number, columnIndex: number }[] {
    return [
        { rowIndex: rowIndex - 1, columnIndex: columnIndex },
        { rowIndex: rowIndex, columnIndex: columnIndex + 1 },
        { rowIndex: rowIndex + 1, columnIndex: columnIndex },
        { rowIndex: rowIndex, columnIndex: columnIndex - 1 },
    ]
}

let points: { [key: string]: Point } = {};

let notFinished = true;

while (notFinished) {
    notFinished = false;

    for (let rowIndex = 1; rowIndex < heatmapHeight + 1; rowIndex++) {
        for (let columnIndex = 1; columnIndex < heatmapWidth + 1; columnIndex++) {
            let value = parseInt(lines[rowIndex][columnIndex]);

            if (value === 9) {
                continue;
            }

            let key = createKey(rowIndex, columnIndex);

            if (points[key]) {
                if (points[key].isDeepest || points[key].parentDeepest) {
                    continue;
                }
            }

            let aroundingCoords = getAroundings(rowIndex, columnIndex);

            let aroundings = aroundingCoords
                .map(x => lines[x.rowIndex][x.columnIndex])
                .filter(x => x !== borderChar);

            if (!points[key]) {
                let lowerOrEqualArounding = aroundings.filter(x => x <= lines[rowIndex][columnIndex]);

                if (!lowerOrEqualArounding.length) {
                    points[key] = {
                        key: key,
                        isDeepest: true,
                        value: value,
                        links: [],
                        parentDeepest: null
                    }

                    continue;
                } else {
                    points[key] = {
                        key: key,
                        isDeepest: false,
                        value: value,
                        links: null,
                        parentDeepest: null
                    }
                }
            }

            notFinished = true;

            for (let aroundingCoord of aroundingCoords) {
                let aroudingCoordKey = createKey(aroundingCoord.rowIndex, aroundingCoord.columnIndex);

                if (points[aroudingCoordKey]) {
                    let newParent: Point = null;

                    if (points[aroudingCoordKey].isDeepest) {
                        newParent = points[aroudingCoordKey];
                    } else if (points[aroudingCoordKey].parentDeepest) {
                        newParent = points[aroudingCoordKey].parentDeepest;
                    }

                    if (newParent) {
                        points[key].parentDeepest = newParent;

                        newParent.links.push(points[key]);

                        break;
                    }
                }
            }
        }
    }
}

let deepestPoints = Object.keys(points).map(x => points[x]).filter(x => x.isDeepest);

let answer = deepestPoints.map(x => x.links.length + 1).sort((x, y) => x - y).slice(-3).reduce((prev, curr) => prev *= curr, 1);

end(time, answer, execution);
