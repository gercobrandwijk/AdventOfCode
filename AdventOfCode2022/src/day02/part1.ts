import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 15 },
        { file: "input", answer: 10404 },
    ],
    false
);

let lines = readAsLines("02", execution);

class Game {
    constructor(private left: Operator, private right: Operator) {

    }

    play(): number {
        let score: number = this.right as number;

        if (this.left === this.right)
            score += 3;
        else if (this.left === Operator.Rock && this.right === Operator.Paper)
            score += 6;
        else if (this.left === Operator.Paper && this.right === Operator.Scissors)
            score += 6;
        else if (this.left === Operator.Scissors && this.right === Operator.Rock)
            score += 6;

        return score;
    }
}

enum Operator {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

let leftHand = {
    'A': Operator.Rock,
    'B': Operator.Paper,
    'C': Operator.Scissors
}

let rightHand = {
    'X': Operator.Rock,
    'Y': Operator.Paper,
    'Z': Operator.Scissors
}

let games = lines.map(x => {
    let splitted = x.split(' ');

    return new Game(leftHand[splitted[0]], rightHand[splitted[1]]);
})

let answer = _.sumBy(games, x => x.play());

end(time, answer, execution);
