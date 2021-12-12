import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: 19 },
    { file: "input", answer: 3679 },
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

function printPath(paths: Cave[]) {
  let route;

  for (let cave of paths) {
    if (!route) {
      route = cave.name;
    } else {
      route += ' -> ' + cave.name;
    }
  }

  // console.log(route);
}

function findPaths(path: Cave[]) {
  let cave = path[path.length - 1];

  let possiblePaths = 0;

  let pathIndex = path.indexOf(cave);

  if (!cave.isBig) {
    let firstVisit = pathIndex >= 0 && pathIndex === path.length - 1;

    if (!firstVisit) {
      return possiblePaths;
    }
  }

  if (cave === endPoint) {
    possiblePaths += 1;

    printPath(path);
  } else {
    for (let link of cave.links) {
      let newSteps = [...path];
      newSteps.push(link);

      possiblePaths += findPaths(newSteps);
    }
  }

  return possiblePaths;
}

let answer = findPaths([startPoint]);

end(time, answer, execution);
