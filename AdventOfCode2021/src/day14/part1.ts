import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 1588 },
        { file: "input", answer: 2657 },
    ],
    false
);

let lines = readAsLines("14", execution);

let template = lines[0];
let templateSplit = template.split('');

let counters: { [key: string]: number } = {};

for (let char of templateSplit) {
    if (!counters[char])
        counters[char] = 1;
    else
        counters[char]++;
}

let pairs = templateSplit.slice(0, templateSplit.length - 1).map((x, index) => {
    return {
        start: x,
        end: templateSplit[index + 1]
    }
})

let rules = lines.slice(2).map(x => {
    let parts = x.split(' -> ');

    return {
        start: parts[0][0],
        end: parts[0][1],
        character: parts[1]
    }
}).reduce((prev, curr) => {
    if (!prev[curr.start]) {
        prev[curr.start] = {};
    }

    prev[curr.start][curr.end] = curr.character;

    return prev;
}, {});

let stepCount = 10;

for (let i = 0; i < stepCount; i++) {
    let pairInsertions: { index: number, pair: { start: string, end: string }, character: string }[] = [];

    pairs.forEach((pair, index) => {
        if (rules[pair.start] && rules[pair.start][pair.end]) {
            pairInsertions.push({
                index: index + pairInsertions.length,
                pair: pair,
                character: rules[pair.start][pair.end]
            })
        }
    });

    for (let pairInsertion of pairInsertions) {
        let newEnd = pairs[pairInsertion.index].end;

        if (!counters[pairInsertion.character])
            counters[pairInsertion.character] = 1;
        else
            counters[pairInsertion.character]++;

        pairs[pairInsertion.index].end = pairInsertion.character;

        pairs.splice(pairInsertion.index + 1, 0, { start: pairInsertion.character, end: newEnd });
    }

    template = pairs.map(x => x.start).join('') + pairs[pairs.length - 1].end;
}

let sorted = _.sortBy(Object.keys(counters).map(x => ({ character: x, count: counters[x] })), ['count']).map(x => x.count);

let answer = (sorted[sorted.length - 1] - sorted[0]);

end(time, answer, execution);