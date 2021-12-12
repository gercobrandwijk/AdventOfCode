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

function printPath(steps: Cave[]) {
  let route;

  for (let cave of steps) {
    if (!route) {
      route = cave.name;
    } else {
      route += ' -> ' + cave.name;
    }
  }

  // console.log(route);
}

function findPaths(steps: Cave[]) {
  let cave = steps[steps.length - 1];

  let possiblePaths = 0;

  let pathIndex = steps.indexOf(cave);

  if (!cave.isBig) {
    let firstVisit = pathIndex >= 0 && pathIndex === steps.length - 1;

    if (!firstVisit) {
      return possiblePaths;
    }
  }

  if (cave === endPoint) {
    possiblePaths += 1;

    printPath(steps);
  } else {
    for (let link of cave.links) {
      let newSteps = [...steps];
      newSteps.push(link);

      possiblePaths += findPaths(newSteps);
    }
  }

  return possiblePaths;
}

let answer = findPaths([startPoint]);

end(time, answer, execution);
