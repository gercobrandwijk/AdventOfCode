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
    isBig: boolean;
    links: Cave[] = [];

    constructor(public name: string) {
        this.isBig = name.toUpperCase() === name;
    }
}

let points: { [key: string]: Cave } = {};
let startPoint: Cave;
let endPoint: Cave;

lines.forEach(x => {
    let start = x.split('-')[0];
    let end = x.split('-')[1];

    if (!points[start]) {
        points[start] = new Cave(start);
    }

    if (!points[end]) {
        points[end] = new Cave(end);
    }

    if (!startPoint && start === 'start') {
        startPoint = points[start];
    }

    if (!endPoint && end === 'end') {
        endPoint = points[end];
    }

    points[start].links.push(points[end]);
    points[end].links.push(points[start]);
})

function getPath(paths: Cave[]) {
    let route;

    for (let cave of paths) {
        if (!route) {
            route = cave.name;
        } else {
            route += ' -> ' + cave.name;
        }
    }

    // console.log(route);

    return route;
}

let possiblePaths = [];

function findPaths(path: Cave[], smallCave: Cave, smallCaveAlreadyAllowedTwice: boolean = false) {
    let cave = path[path.length - 1];

    let pathIndex = path.indexOf(cave);

    if (!cave.isBig) {
        let firstVisit = pathIndex >= 0 && pathIndex === path.length - 1;

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

    if (cave === endPoint) {
        possiblePaths.push(getPath(path));
    } else {
        for (let link of cave.links) {
            let newSteps = [...path];
            newSteps.push(link);

            findPaths(newSteps, smallCave, smallCaveAlreadyAllowedTwice);
        }
    }
}

let smallCaves = Object.keys(points).map(x => points[x]).filter(x => !x.isBig && x !== startPoint && x !== endPoint);

for (let smallCave of smallCaves) {
    findPaths([startPoint], smallCave);
}

let answer = _.uniq(possiblePaths).length;

end(time, answer, execution);
