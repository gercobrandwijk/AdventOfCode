import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 2 },
        { file: "input", answer: 450 },
    ],
    false
);

let lines = readAsLines("04", execution);

class Pair {
    left: Section;
    right: Section;

    constructor(pair: string) {
        this.left = new Section(pair.split(',')[0])
        this.right = new Section(pair.split(',')[1])
    }

    intersectsFully(): boolean {
        if (this.left.intersectsFully(this.right))
            return true;

        if (this.right.intersectsFully(this.left))
            return true;

        return false;
    }
}

class Section {
    start: number;
    end: number;

    constructor(section: string) {
        let ranges = section.split('-').map(x => parseInt(x));

        this.start = ranges[0];
        this.end = ranges[1];
    }

    intersectsFully(other: Section): boolean {
        return this.start >= other.start && this.end <= other.end;
    }
}

let pairs = lines.map(x => new Pair(x));

let answer = pairs.filter(x => x.intersectsFully()).length;

end(time, answer, execution);
