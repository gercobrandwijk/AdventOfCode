import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 2188189693529 },
        { file: "input", answer: undefined },
    ],
    true
);

let lines = readAsLines("14", execution);

// let template = lines[0];
// let characters = template.split('');

// let rules = lines.slice(2).map(x => {
//     let parts = x.split(' -> ');

//     return {
//         start: parts[0][0],
//         end: parts[0][1],
//         character: parts[1]
//     }
// }).reduce((prev, curr) => {
//     if (!prev[curr.start]) {
//         prev[curr.start] = {};
//     }

//     prev[curr.start][curr.end] = curr.character;

//     return prev;
// }, {});

// let charCounters: { [key: string]: number } = {};

// function addChar(value: string) {
//     if (!charCounters[value])
//         charCounters[value] = 1;
//     else
//         charCounters[value]++;
// }

// class Char {
//     constructor(public value: string, public next: Char = null) {
//         addChar(value);
//     }

//     produce(queueToProduceOn: ((queue: any) => void)[]) {
//         if (this.next && rules[this.value][this.next.value]) {
//             queueToProduceOn.push((queue) => {
//                 this.next.produce(queue);
//                 this.next = new Char(rules[this.value][this.next.value], this.next);
//             });
//         }
//     }

//     print() {
//         return this.value + (this.next ? this.next.print() : '');
//     }
// }

// let chainStart: Char = new Char(characters[0], new Char(characters[1], new Char(characters[2], new Char(characters[3]))));

// for (let i = 0; i < 40; i++) {
//     console.log('step ' + (i + 1), charCounters);
//     let queue = [(queue) => { chainStart.produce(queue) }];

//     while (queue.length) {
//         let current = queue.shift();

//         current(queue);
//     }
// }

// let sorted = _.sortBy(Object.keys(charCounters).map(x => ({ character: x, count: charCounters[x] })), ['count']).map(x => x.count);

// let answer = (sorted[sorted.length - 1] - sorted[0]);

let answer = undefined;

end(time, answer, execution);