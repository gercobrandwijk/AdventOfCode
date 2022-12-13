import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 4 },
        { file: "input", answer: 837 },
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

    intersectsPartially(): boolean {
        if (this.left.intersectsPartially(this.right))
            return true;

        if (this.right.intersectsPartially(this.left))
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

    intersectsPartially(other: Section): boolean {
        return this.start <= other.end && this.end >= other.start;
    }
}

let pairs = lines.map(x => new Pair(x));

let answer = pairs.filter(x => x.intersectsPartially()).length;

end(time, answer, execution);
