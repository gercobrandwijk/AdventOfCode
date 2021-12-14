import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 17 },
        { file: "input", answer: 716 },
    ],
    false
);

let lines = readAsLines("13", execution);

let emptyLineIndex = lines.findIndex(x => x.length === 0);

let maxX = 0;
let maxY = 0;

let coords = lines
    .slice(0, emptyLineIndex)
    .map(x => ({ x: parseInt(x.split(',')[0]), y: parseInt(x.split(',')[1]) }))
    .reduce((prev, curr) => {
        if (!prev[curr.x]) {
            prev[curr.x] = {};
        }

        if (curr.x > maxX) {
            maxX = curr.x;
        }

        if (curr.y > maxY) {
            maxY = curr.y;
        }

        prev[curr.x][curr.y] = true;

        return prev;
    }, {});
let folds = lines.slice(emptyLineIndex + 1).map(x => ({ axis: x[11], value: parseInt(x.slice(13)) }));

function draw() {
    for (let y = 0; y <= maxY; y++) {
        let row = '';

        for (let x = 0; x <= maxX; x++) {
            row += '' + (map[y][x] === '#' ? '#' : ' ');
        }

        console.log(row);
    }
}

let map = [];

for (let y = 0; y <= maxY; y++) {
    let row = [];

    for (let x = 0; x <= maxX; x++) {
        let coordExists = coords[x] && coords[x][y] && coords[x][y] === true;

        row.push(coordExists ? '#' : '.');
    }

    map.push(row);
}

folds = folds.slice(0, 1);

let visibleDots = 0;

for (let fold of folds) {
    let middle = fold.value;

    switch (fold.axis) {
        case 'x':
            for (let y = 0; y <= maxY; y++) {
                for (let x = 0; x < middle; x++) {
                    if (map[y][x] !== '#' && map[y][middle - (x - middle)] === '#') {
                        map[y][x] = '#';
                    }

                    if (map[y][x] === '#') {
                        visibleDots++;
                    }
                }
            }

            maxX = middle - 1;
            break;
        case 'y':
            for (let y = 0; y < middle; y++) {
                for (let x = 0; x <= maxX; x++) {
                    if (map[y][x] !== '#' && map[middle - (y - middle)][x] === '#') {
                        map[y][x] = '#';
                    }

                    if (map[y][x] === '#') {
                        visibleDots++;
                    }
                }
            }

            maxY = middle - 1;
            break;
    }
}

let answer = visibleDots;

end(time, answer, execution);
