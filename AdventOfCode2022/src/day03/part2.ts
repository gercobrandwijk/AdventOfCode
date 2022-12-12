import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 70 },
        { file: "input", answer: 2864 },
    ],
    false
);

let lines = readAsLines("03", execution);

class Rucksack {
    constructor(public content: string) {

    }

    contains(char: string): boolean {
        return this.content.indexOf(char) >= 0;
    }
}

class Group {
    constructor(private sacks: Rucksack[]) {

    }

    priority(): number {
        let sortedSacks = _.sortBy(this.sacks, this.sacks.length);

        let longestSack = sortedSacks[2];

        for (let i = 0; i < longestSack.content.length; i++) {
            let character = longestSack.content[i];

            if (sortedSacks[0].contains(character) && sortedSacks[1].contains(character)) {
                let charCode = character.charCodeAt(0);

                if (charCode < 97) {
                    return charCode - 38;
                } else {
                    return charCode - 96;
                }
            }
        }
    }
}

let groups = _.chunk(lines.map(x => new Rucksack(x)), 3).map(x => new Group(x));

let answer = _.sumBy(groups, x => x.priority());

end(time, answer, execution);
