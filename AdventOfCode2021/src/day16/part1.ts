import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 31 },
        { file: "input", answer: 936 },
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
    Bits,
    Amount
}

class Message {
    version: number;
    type: number;

    constructor(header: string) {
        this.version = parseInt(header.slice(0, 3), 2);
        this.type = parseInt(header.slice(3, 6), 2);
    }

    literalValueBinary: string = '';

    subpacketMode: SubpacketMode;
    subpacketModeBits: number;
    subpacketModeBitsValues: number[] = [];
    subpacketModeAmount: number;

    subpackets: Message[] = [];

    length: number = 0;

    get literalValueBinaryAsDecimal(): number {
        return parseInt(this.literalValueBinary, 2);
    }

    getVersionTotal(): number {
        let total = this.version;

        for (let sub of this.subpackets) {
            total += sub.getVersionTotal();
        }

        return total;
    }

    print(nested: number = 0) {
        let message = Array.from(Array(nested).keys()).map(x => '\t').join('');

        message += 'version=' + this.version + '\ttype=' + this.type;

        if (this.literalValueBinary) {
            message += '\tvalue=' + this.literalValueBinaryAsDecimal;
        }

        switch (this.subpacketMode) {
            case SubpacketMode.Bits:
                message += '\tsubs=' + this.subpacketModeBits + 'bits';
                break;
            case SubpacketMode.Amount:
                message += '\tsubs=' + this.subpacketModeAmount + ' messages';
                break;
        }

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
            do {
                isLastMessage = input[index] === '0';
                index += 1;

                message.literalValueBinary = input.slice(index, index + 4);
                index += 4;
            }
            while (!isLastMessage)

            break;
        // operator
        default:
            message.subpacketMode = input.slice(index, index + 1) === '0' ? SubpacketMode.Bits : SubpacketMode.Amount;
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
    }

    message.length = index - startIndex;

    // let endPad = 4 - (index % 4);

    // message.length = index + endPad - startIndex;

    return message;
}

let message = parseMessage(0);
// message.print();

let answer = message.getVersionTotal();

end(time, answer, execution);
