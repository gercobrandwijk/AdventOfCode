import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 1924 },
        { file: "input", answer: 4880 },
    ],
    false
);

let lines = readAsLines("04", execution);

let randomNumbers = lines[0].split(',').map(x => parseInt(x));

class Board {
    rows: BoardRowOrCol[];
    cols: BoardRowOrCol[];

    alreadyWon: boolean;

    isWinning() {
        let rowWinning = this.rows.findIndex(x => x.isWinning());

        if (rowWinning >= 0) {
            // console.log('Row ' + rowWinning + ' all drawn');

            return true;
        }

        let colWinning = this.cols.findIndex(x => x.isWinning());

        if (colWinning >= 0) {
            // console.log('Col ' + colWinning + ' all drawn');

            return true;
        }

        return false;
    }

    getScore() {
        return this.rows.reduce((prev, curr) => prev += curr.getScore(), 0);
    }

    draw() {
        for (let row of this.rows) {
            console.log(row.items.map(x => x.drawn ? '_' + x.value + '_' : x.value).join('\t'));
        }
    }
}

class BoardRowOrCol {
    items: BoardItem[];

    isWinning() {
        return this.items.filter(x => x.drawn).length === this.items.length;
    }

    getScore() {
        return this.items.filter(x => !x.drawn).reduce((prev, curr) => prev += curr.value, 0);
    }
}

class BoardItem {
    value: number;
    drawn: boolean;
}

let boards: Board[] = [];
let items: { [key: number]: BoardItem } = {};

for (let boardIndex = 2; boardIndex < lines.length; boardIndex += 6) {
    let board = new Board();
    board.rows = [];
    board.cols = [];
    board.alreadyWon = false;

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        let rowIndexCorrected = boardIndex + rowIndex;

        let rowNumbers = lines[rowIndexCorrected].match(/.{1,3}/g).map(x => parseInt(x.trim()));

        let boardRow = new BoardRowOrCol();
        boardRow.items = [];

        for (let colIndex = 0; colIndex < 5; colIndex++) {
            let value = rowNumbers[colIndex];

            if (!items[value]) {
                let boardItem = new BoardItem();
                boardItem.value = value;
                boardItem.drawn = false;

                items[value] = boardItem;
            }


            if (!board.cols[colIndex]) {
                board.cols[colIndex] = new BoardRowOrCol();
                board.cols[colIndex].items = [];
            }

            board.cols[colIndex].items.push(items[value]);

            boardRow.items.push(items[value]);
        }

        board.rows.push(boardRow);
    }

    boards.push(board);
}

function drawBoards() {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        console.log('Board ' + (boardIndex + 1));
        boards[boardIndex].draw();

        console.log();
    }
}

// drawBoards();

let winningScore;

for (let i = 0; i < randomNumbers.length; i++) {
    let value = randomNumbers[i];

    if (items[value]) {
        items[value].drawn = true;
    }

    // console.log('Draw ' + (i + 1))
    // drawBoards();

    let stillRunningBoards = boards.filter(x => !x.alreadyWon);

    if (stillRunningBoards.length === 1) {
        if (stillRunningBoards[0].isWinning()) {
            winningScore = stillRunningBoards[0].getScore() * value;

            break;
        }
    } else {
        let winningBoards = stillRunningBoards.filter(x => x.isWinning());

        winningBoards.forEach(x => x.alreadyWon = true);
    }
}

let answer = winningScore;

end(time, answer, execution);
