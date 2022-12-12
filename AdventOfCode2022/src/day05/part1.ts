import * as _ from "lodash";
import { end, read, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 'CMZ' },
        { file: "input", answer: 'QPJPLMNNR' },
    ],
    false
);

let fileContent = read("05", execution);

let parts: string[] = fileContent.split('\r\n\r\n');

let stackContent = parts[0].split('\r\n');

let stackAmount = stackContent[stackContent.length - 1].trim().split('   ');

class Stack {
    items: string[] = [];

    constructor() {

    }
}

let stacks = stackAmount.map(x => new Stack());

for (let i = stackContent.length - 2; i >= 0; i--) {
    for (let lineIndex = 0; lineIndex < stackContent[i].length; lineIndex += 4) {
        if (stackContent[i][lineIndex] === '[') {
            stacks[lineIndex / 4].items.push(stackContent[i][lineIndex + 1]);
        }
    }
}

class Command {
    amount: number;
    from: number;
    to: number;

    constructor(command: string) {
        let parts = command.split(' ');

        this.amount = parseInt(parts[1]);
        this.from = parseInt(parts[3]);
        this.to = parseInt(parts[5]);
    }
}

let commands = parts[1].split('\r\n').map(x => new Command(x));

for (let command of commands) {
    for (let i = 0; i < command.amount; i++) {
        stacks[command.to - 1].items.push(stacks[command.from - 1].items.pop());
    }
}

let answer = '';

for (let stack of stacks) {
    answer += stack.items[stack.items.length - 1];
}

end(time, answer, execution);
