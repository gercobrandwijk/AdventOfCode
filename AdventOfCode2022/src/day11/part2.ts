import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 2713310158 },
        { file: "input", answer: 30599555965 },
    ],
    false
);

let lines = readAsLines("11", execution);

enum OperationType {
    PlusBy,
    MultiplyBy,
    MultiplyBySelf
}

class Monkey {
    items: number[];

    operation: OperationType;
    operationBy: number;

    testDivision: number;
    testTrueMonkey: number;
    testFalseMonkey: number;

    inspections: number = 0;

    constructor(lines: string[]) {
        this.items = lines[1].split(':')[1].split(',').map(x => parseInt(x.trim()));

        let operationString = lines[2].split('new = ')[1];

        if (operationString.indexOf(' * ') >= 0) {
            if (operationString.split(' * ')[1] === 'old') {
                this.operation = OperationType.MultiplyBySelf;
            } else {
                this.operation = OperationType.MultiplyBy;
                this.operationBy = parseInt(operationString.split(' * ')[1]);
            }
        } else if (operationString.indexOf(' + ') >= 0) {
            this.operation = OperationType.PlusBy;
            this.operationBy = parseInt(operationString.split(' + ')[1]);
        }

        this.testDivision = parseInt(lines[3].split('by ')[1]);
        this.testTrueMonkey = parseInt(lines[4].split('monkey ')[1]);
        this.testFalseMonkey = parseInt(lines[5].split('monkey ')[1]);
    }

    operate(worryLevel: number): number {
        switch (this.operation) {
            case OperationType.PlusBy:
                return worryLevel + this.operationBy;
            case OperationType.MultiplyBy:
                return worryLevel * this.operationBy;
            case OperationType.MultiplyBySelf:
                return worryLevel * worryLevel;
        }
    }

    test(worryLevel: number): boolean {
        return worryLevel % this.testDivision === 0;
    }
}

let monkeys = _.chunk(lines, 7).map(x => new Monkey(x));

let moduleValue = monkeys.map(x => x.testDivision).reduce((prev, curr) => prev * curr, 1);

let rounds = 10000;

for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
        let item = monkey.items.shift();

        while (item) {
            monkey.inspections++;

            let newWorryLevel: number = monkey.operate(item);

            newWorryLevel = newWorryLevel % moduleValue;

            if (monkey.test(newWorryLevel)) {
                monkeys[monkey.testTrueMonkey].items.push(newWorryLevel);
            } else {
                monkeys[monkey.testFalseMonkey].items.push(newWorryLevel);
            }

            item = monkey.items.shift();
        }
    }
}

let answer = _.sortBy(monkeys, x => x.inspections).reverse().slice(0, 2).reduce((prev, curr) => prev * curr.inspections, 1);

end(time, answer, execution);
