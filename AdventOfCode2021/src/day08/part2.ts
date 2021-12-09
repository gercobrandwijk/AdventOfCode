import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 61229 },
        { file: "input", answer: 1010472 },
    ],
    false
);


let lines = readAsLines("08", execution);

let items = lines.map(x => x.split(' | ')).map(x => ({ digits: x[0].split(' '), outputs: x[1].split(' '), outputNumber: undefined }));

for (let item of items) {
    item.digits.sort((x, y) => x.length - y.length);

    item.digits = item.digits.map(x => x.split('').sort().join(''));
    item.outputs = item.outputs.map(x => x.split('').sort().join(''));

    let digitsNumber1 = item.digits.find(x => x.length === 2); // 1
    let digitsNumber4 = item.digits.find(x => x.length === 4); // 4
    let digitsNumber7 = item.digits.find(x => x.length === 3); // 7
    let digitsNumber8 = item.digits.find(x => x.length === 7); // 8

    let segmentOptions = {
        a: /* top         */ digitsNumber7.split('').find(x => !digitsNumber1.split('').find(y => y === x)),
        b: /* left top    */ digitsNumber4.split('').filter(x => !digitsNumber1.split('').find(y => y === x)),
        c: /* right top   */ digitsNumber1.split(''),
        d: /* middle      */ digitsNumber4.split('').filter(x => !digitsNumber1.split('').find(y => y === x)),
        e: /* left under  */ digitsNumber8.split('').filter(x => !digitsNumber1.split('').find(y => y === x) && !digitsNumber4.split('').find(y => y === x) && !digitsNumber7.split('').find(y => y === x)),
        f: /* right under */ digitsNumber1.split(''),
        g: /* under       */ digitsNumber8.split('').filter(x => !digitsNumber1.split('').find(y => y === x) && !digitsNumber4.split('').find(y => y === x) && !digitsNumber7.split('').find(y => y === x))
    };

    let digitsWithLength5 = item.digits.filter(x => x.length === 5);
    let digitsWithLength6 = item.digits.filter(x => x.length === 6);

    let numberOptions = {
        0: digitsWithLength6.find(digitWithLength6Chars => segmentOptions.b.filter(x => digitWithLength6Chars.split('').find(y => y === x)).length === 1), // 6 -> no middle
        1: digitsNumber1,
        2: digitsWithLength5.find(digitWithLength5Chars => segmentOptions.c.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1 && segmentOptions.d.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1), // 5 -> no left top, no right under
        3: digitsWithLength5.find(digitWithLength5Chars => segmentOptions.d.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1 && segmentOptions.g.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1), // 5 -> no left top, no left under
        4: digitsNumber4,
        5: digitsWithLength5.find(digitWithLength5Chars => segmentOptions.c.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1 && segmentOptions.e.filter(x => digitWithLength5Chars.split('').find(y => y === x)).length === 1), // 5 -> no right top, no left under
        6: digitsWithLength6.find(digitWithLength6Chars => segmentOptions.c.filter(x => digitWithLength6Chars.split('').find(y => y === x)).length === 1), // 6 -> no right top
        7: digitsNumber7,
        8: digitsNumber8,
        9: digitsWithLength6.find(digitWithLength6Chars => segmentOptions.e.filter(x => digitWithLength6Chars.split('').find(y => y === x)).length === 1) // 6 -> no left under
    }

    let swapped = Object.keys(numberOptions).reduce((prev, curr) => {
        prev[numberOptions[curr]] = curr;

        return prev;
    }, {});

    item.outputNumber = parseInt(item.outputs.map(x => swapped[x]).join(''));
}

let answer = items.reduce((prev, curr) => prev += curr.outputNumber, 0);

end(time, answer, execution);
