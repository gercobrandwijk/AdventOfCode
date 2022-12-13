import * as _ from "lodash";
import { tail } from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 13 },
        { file: "input", answer: 6209 },
    ],
    false
);

let lines = readAsLines("09", execution);

class Coord {
    constructor(public x: number, public y: number) {

    }

    asString(): string {
        return '[' + this.x + ',' + this.y + ']';
    }

    isTouching(coord: Coord): boolean {
        return Math.abs(this.x - coord.x) <= 1 && Math.abs(this.y - coord.y) <= 1
    }

    move(direction: 'U' | 'R' | 'D' | 'L') {
        switch (direction) {
            case 'U':
                this.y -= 1;
                break;
            case 'R':
                this.x += 1;
                break;
            case 'D':
                this.y += 1;
                break;
            case 'L':
                this.x -= 1;
                break;
        }
    }

    moveTowards(coord: Coord) {
        if (this.isTouching(coord)) {
            return;
        }

        if (this.x < coord.x) {
            this.x++;
        } else if (this.x > coord.x) {
            this.x--;
        }

        if (this.y < coord.y) {
            this.y++;
        } else if (this.y > coord.y) {
            this.y--;
        }
    }
}

class Command {
    direction: 'U' | 'R' | 'D' | 'L';
    amount: number

    constructor(command: string) {
        this.direction = command.split(' ')[0] as 'U' | 'R' | 'D' | 'L';
        this.amount = parseInt(command.split(' ')[1]);
    }
}

let commands = lines.map(x => new Command(x))

let headCoord: Coord = new Coord(0, 0);
let tailCoord: Coord = new Coord(0, 0);

let tailPositions = {};

function addLog() {
    let identifier = tailCoord.asString();

    if (!tailPositions[identifier])
        tailPositions[identifier] = { visits: 0, lastVisitHeadPosition: null };

    tailPositions[identifier].visits++;
    tailPositions[identifier].lastVisitHeadPosition = headCoord.asString();
}

addLog();

for (let command of commands) {
    for (let i = 0; i < command.amount; i++) {
        headCoord.move(command.direction);

        tailCoord.moveTowards(headCoord);

        addLog();
    }
}

let answer = Object.keys(tailPositions).length;

end(time, answer, execution);
