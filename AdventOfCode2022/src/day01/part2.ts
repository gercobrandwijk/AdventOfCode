import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 45000 },
        { file: "input", answer: undefined },
    ],
    false
);

let lines = readAsLines("01", execution);

let elfs: Elf[] = [];

class Elf {
    items: number[] = [];
    total: number = 0;

    add(item: number) {
        this.items.push(item);

        this.total += item;
    }
}

let currentElf: Elf;

lines.forEach(x => {
    if (!currentElf || !x) {
        currentElf = new Elf();

        elfs.push(currentElf);
    }

    if (x) {
        currentElf.add(parseInt(x));
    }
})

let answer = _.sortBy(elfs, x => -x.total)
    .slice(0, 3)
    .reduce((x, y) => x + y.total, 0);

end(time, answer, execution);
