import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 24000 },
        { file: "input", answer: 66719 },
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

let answer = _.maxBy(elfs, x => x.total).total;

end(time, answer, execution);
