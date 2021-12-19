import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test2", answer: 54 },
        { file: "input", answer: 6802496672062 },
    ],
    false
);

let lines = readAsLines("16", execution);

function toBinary(hex: string) {
    let result = '';

    for (let char of hex.split('')) {
        switch (char) {
            case '0':
                result += '0000';
                break;
            case '1':
                result += '0001';
                break;
            case '2':
                result += '0010';
                break;
            case '3':
                result += '0011';
                break;
            case '4':
                result += '0100';
                break;
            case '5':
                result += '0101';
                break;
            case '6':
                result += '0110';
                break;
            case '7':
                result += '0111';
                break;
            case '8':
                result += '1000';
                break;
            case '9':
                result += '1001';
                break;
            case 'A':
                result += '1010';
                break;
            case 'B':
                result += '1011';
                break;
            case 'C':
                result += '1100';
                break;
            case 'D':
                result += '1101';
                break;
            case 'E':
                result += '1110';
                break;
            case 'F':
                result += '1111';
                break;
        }
    }

    return result;
}

let input = toBinary(lines[0]);

enum SubpacketMode {
    Bits = 1,
    Amount = 2
}

class Message {
    version: number;
    type: number;

    constructor(header: string) {
        this.version = parseInt(header.slice(0, 3), 2);
        this.type = parseInt(header.slice(3, 6), 2);
    }

    literalValue: number;

    subpacketMode: SubpacketMode;
    subpacketModeBits: number;
    subpacketModeBitsValues: number[] = [];
    subpacketModeAmount: number;

    subpackets: Message[] = [];

    length: number = 0;

    getVersionTotal(): number {
        let total = this.version;

        for (let sub of this.subpackets) {
            total += sub.getVersionTotal();
        }

        return total;
    }

    getValue(): number {
        switch (this.type) {
            case 0: // sum
                return this.subpackets.reduce((prev, curr) => {
                    prev += curr.getValue();

                    return prev;
                }, 0);
            case 1: // product
                return this.subpackets.reduce((prev, curr) => {
                    prev *= curr.getValue();

                    return prev;
                }, 1);
            case 2: // minimum
                return this.subpackets.reduce((prev, curr) => {
                    if (curr.getValue() < prev) {
                        prev = curr.getValue();
                    }

                    return prev;
                }, Infinity);
            case 3: // maximum
                return this.subpackets.reduce((prev, curr) => {
                    if (curr.getValue() > prev) {
                        prev = curr.getValue();
                    }

                    return prev;
                }, 0);
            case 4: // literal
                return this.literalValue;
            case 5: // bigger than (first bigger than second sub) = 1
                return this.subpackets[0].getValue() > this.subpackets[1].getValue() ? 1 : 0;
            case 6: // smaller than (first smaller than second sub) = 1
                return this.subpackets[0].getValue() < this.subpackets[1].getValue() ? 1 : 0;
            case 7: // equal (first smaller than second sub) = 1
                return this.subpackets[0].getValue() === this.subpackets[1].getValue() ? 1 : 0;
        }

        throw new Error("Not supported type " + this.type);
    }

    get typeText() {
        switch (this.type) {
            case 0: // sum
                return 'sum';
            case 1: // product
                return 'product';
            case 2: // minimum
                return 'min';
            case 3: // maximum
                return 'max';
            case 4: // literal
                return 'literal';
            case 5: // bigger than (first bigger than second sub) = 1
                return 'bigger than';
            case 6: // smaller than (first smaller than second sub) = 1
                return 'smaller than';
            case 7: // equal (first smaller than second sub) = 1
                return 'equal';
        }

        throw new Error("Not supported type " + this.type);
    }

    print(nested: number = 0) {
        let message = Array.from(Array(nested).keys()).map(x => '\t').join('');

        message += 'version=' + this.version + '\ttype=' + this.type + ' ' + this.typeText.toUpperCase();

        if (this.literalValue) {
            message += '\tvalue=' + this.literalValue;
        }

        switch (this.subpacketMode) {
            case SubpacketMode.Bits:
                message += '\tsubs=' + this.subpacketModeBits + 'bits';
                break;
            case SubpacketMode.Amount:
                message += '\tsubs=' + this.subpacketModeAmount + ' messages';
                break;
        }

        message += '\t\t\tVALUE = ' + this.getValue();

        console.log(message);

        for (let sub of this.subpackets) {
            sub.print(nested + 1);
        }
    }
}

function parseMessage(startIndex: number): Message {
    let index = startIndex;
    let message = new Message(input.slice(index, index + 6));
    index += 6;

    switch (message.type) {
        // literal
        case 4:
            let isLastMessage;

            let binaryString = '';

            do {
                isLastMessage = input[index] === '0';
                index += 1;

                binaryString += input.slice(index, index + 4);
                index += 4;
            }
            while (!isLastMessage)

            message.literalValue = parseInt(binaryString, 2);

            break;
        // operator
        case 0:
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7:
            switch (input.slice(index, index + 1)) {
                case '0':
                    message.subpacketMode = SubpacketMode.Bits;
                    break;
                case '1':
                    message.subpacketMode = SubpacketMode.Amount;
                    break;
                default:
                    throw new Error('Not supported subpacketmode');
            }

            index += 1;

            switch (message.subpacketMode) {
                case SubpacketMode.Bits:
                    message.subpacketModeBits = parseInt(input.slice(index, index + 15), 2);
                    index += 15;

                    let subpacketLength = 0;

                    while (subpacketLength < message.subpacketModeBits) {
                        let subpacket = parseMessage(index + subpacketLength);

                        message.subpackets.push(subpacket);

                        subpacketLength += subpacket.length;
                    }

                    index += subpacketLength;

                    break;
                case SubpacketMode.Amount:
                    message.subpacketModeAmount = parseInt(input.slice(index, index + 11), 2);
                    index += 11;

                    for (let subpacketIndex = 0; subpacketIndex < message.subpacketModeAmount; subpacketIndex++) {
                        let subpacket = parseMessage(index);

                        message.subpackets.push(subpacket);

                        index += subpacket.length;
                    }

                    break;
            }

            break;
        default:
            throw new Error("Not supported type " + message.type);
    }

    message.length = index - startIndex;

    // if (message.type === 4) {
    //     let endPad = 4 - (index % 4);

    //     message.length += endPad;
    // }

    return message;
}

let message = parseMessage(0);
// message.print();

let answer = message.getValue();

end(time, answer, execution);
