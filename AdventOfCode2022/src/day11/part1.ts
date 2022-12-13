import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 10605 },
        { file: "input", answer: 113220 },
    ],
    false
);

let lines = readAsLines("11", execution);

class Monkey {
    items: number[];
    operation: string;
    testDivisibleBy: number;
    testTrueMonkey: number;
    testFalseMonkey: number;

    inspectations: number = 0;

    constructor(lines: string[]) {
        this.items = lines[1].split(':')[1].split(',').map(x => parseInt(x.trim()));

        this.operation = lines[2].split('new = ')[1];

        this.testDivisibleBy = parseInt(lines[3].split('by ')[1]);
        this.testTrueMonkey = parseInt(lines[4].split('monkey ')[1]);
        this.testFalseMonkey = parseInt(lines[5].split('monkey ')[1]);
    }

    operate(worryLevel: number): number {
        let evalOperation = this.operation;

        while (evalOperation.indexOf('old') >= 0) {
            evalOperation = evalOperation.replace('old', worryLevel.toString());
        }

        return parseInt(eval(evalOperation));
    }

    test(worryLevel: number): boolean {
        return worryLevel % this.testDivisibleBy === 0;
    }
}

let monkeys = _.chunk(lines, 7).map(x => new Monkey(x));

let rounds = 20;

for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
        for (let item of monkey.items) {
            monkey.inspectations++;

            let newWorryLevel: number = monkey.operate(item);

            newWorryLevel = Math.floor(newWorryLevel / 3);

            if (monkey.test(newWorryLevel)) {
                monkeys[monkey.testTrueMonkey].items.push(newWorryLevel);
            } else {
                monkeys[monkey.testFalseMonkey].items.push(newWorryLevel);
            }
        }

        monkey.items = [];
    }
}

let answer = _.sortBy(monkeys, x => x.inspectations).reverse().slice(0, 2).reduce((prev, curr) => prev * curr.inspectations, 1);

end(time, answer, execution);
