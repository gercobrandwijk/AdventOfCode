import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 157 },
        { file: "input", answer: 8202 },
    ],
    false
);

let lines = readAsLines("03", execution);

class Rucksack {
    part1: string[];
    part2: string[];

    constructor(content: string) {
        let half = content.length / 2;

        this.part1 = content.slice(0, half).split('');
        this.part2 = content.slice(half).split('');
    }

    priority(): number {
        for (let i = 0; i < this.part1.length; i++) {
            let character = this.part2.find(x => x === this.part1[i]);

            if (character) {
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

let rucksacks = lines.map(x => new Rucksack(x))

let answer = _.sumBy(rucksacks, x => x.priority());

end(time, answer, execution);
