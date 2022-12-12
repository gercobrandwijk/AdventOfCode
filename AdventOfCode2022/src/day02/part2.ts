import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 12 },
        { file: "input", answer: 10334 },
    ],
    false
);

let lines = readAsLines("02", execution);

class Game {
    constructor(private opponent: Operator, private outcome: Outcome) {

    }

    play(): number {
        let score: number = this.outcome as number;

        switch (this.outcome) {
            case Outcome.Loose:
                switch (this.opponent) {
                    case Operator.Rock:
                        score += Operator.Scissors;
                        break;
                    case Operator.Paper:
                        score += Operator.Rock;
                        break;
                    case Operator.Scissors:
                        score += Operator.Paper;
                        break;
                }
                break;
            case Outcome.Draw:
                score += this.opponent;
                break;
            case Outcome.Win:
                switch (this.opponent) {
                    case Operator.Rock:
                        score += Operator.Paper;
                        break;
                    case Operator.Paper:
                        score += Operator.Scissors
                        break;
                    case Operator.Scissors:
                        score += Operator.Rock;
                        break;
                }
                break;
        }

        return score;
    }
}

enum Operator {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

enum Outcome {
    Loose = 0,
    Draw = 3,
    Win = 6
}

let opponent = {
    'A': Operator.Rock,
    'B': Operator.Paper,
    'C': Operator.Scissors
}

let outcomes = {
    'X': Outcome.Loose,
    'Y': Outcome.Draw,
    'Z': Outcome.Win
}

let games = lines.map(x => {
    let splitted = x.split(' ');

    return new Game(opponent[splitted[0]], outcomes[splitted[1]]);
})

let answer = _.sumBy(games, x => x.play());

end(time, answer, execution);
