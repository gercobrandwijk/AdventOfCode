import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 36 },
        { file: "input", answer: 107395 },
    ],
    false
);

let lines = readAsLines("12", execution);

class Cave {
    isStart: boolean;
    isEnd: boolean;

    isBig: boolean;

    links: Cave[] = [];

    constructor(public name: string) {
        this.isStart = name === 'start';
        this.isEnd = name === 'end';

        this.isBig = name.toUpperCase() === name;
    }
}

let points: { [key: string]: Cave } = {};
let startCave: Cave;
let endCave: Cave;

let smallCaves: Cave[] = [];

lines.forEach(x => {
    let from = x.split('-')[0];
    let to = x.split('-')[1];

    if (!points[from]) {
        points[from] = new Cave(from);

        if (!points[from].isStart && !points[from].isEnd && !points[from].isBig) {
            smallCaves.push(points[from]);
        }

        if (!startCave && points[from].isStart) {
            startCave = points[from];
        }

        if (!endCave && points[from].isEnd) {
            endCave = points[from];
        }
    }

    if (!points[to]) {
        points[to] = new Cave(to);

        if (!points[to].isStart && !points[to].isEnd && !points[to].isBig) {
            smallCaves.push(points[to]);
        }

        if (!startCave && points[to].isStart) {
            startCave = points[to];
        }

        if (!endCave && points[to].isEnd) {
            endCave = points[to];
        }
    }

    points[from].links.push(points[to]);
    points[to].links.push(points[from]);
})

function getPath(steps: Cave[]) {
    let route;

    for (let cave of steps) {
        if (!route) {
            route = cave.name;
        } else {
            route += ',' + cave.name;
        }
    }

    // console.log(route);

    return route;
}

let possiblePaths = [];

function findPaths(steps: Cave[], smallCave: Cave, smallCaveAlreadyAllowedTwice: boolean = false) {
    let cave = steps[steps.length - 1];

    let pathIndex = steps.indexOf(cave);

    if (!cave.isBig) {
        let firstVisit = pathIndex >= 0 && pathIndex === steps.length - 1;

        let allow = false;

        if (firstVisit) {
            allow = true;
        } else if (smallCave === cave && !smallCaveAlreadyAllowedTwice) {
            allow = true;

            smallCaveAlreadyAllowedTwice = true;
        }

        if (!allow) {
            return;
        }
    }

    for (let nextCave of cave.links) {
        steps.push(nextCave);

        if (nextCave === endCave) {
            possiblePaths.push(getPath(steps));
        } else {
            findPaths(steps, smallCave, smallCaveAlreadyAllowedTwice);
        }

        steps.pop();
    }
}

for (let smallCave of smallCaves) {
    findPaths([startCave], smallCave);
}

let answer = _.uniq(possiblePaths).length;

end(time, answer, execution);
