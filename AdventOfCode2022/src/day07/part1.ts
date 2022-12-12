import * as _ from "lodash";
import { end, readAsLines, start } from "../helpers";

let { time, execution } = start(
    [
        { file: "test", answer: 95437 },
        { file: "input", answer: 1307902 },
    ],
    false
);

let lines = readAsLines("07", execution);

class Directory {
    files: File[] = [];
    directories: Directory[] = [];

    constructor(public name: string, public parentDirectory?: Directory) {

    }

    size(): number {
        let size = 0;

        for (let directory of this.directories) {
            size += directory.size();
        }

        for (let file of this.files) {
            size += file.size;
        }

        return size;
    }
}

class File {
    constructor(public size: number, public name: string) {
    }
}

let root = new Directory('/');

let currentDirectory: Directory;

let allDirectories: Directory[] = [];

for (let line of lines) {
    let parts = line.split(' ');

    switch (parts[0]) {
        case '$':
            switch (parts[1]) {
                case 'cd':
                    switch (parts[2]) {
                        case '/':
                            currentDirectory = root;
                            break;
                        case '..':
                            currentDirectory = currentDirectory.parentDirectory;
                            break;
                        default:
                            currentDirectory = currentDirectory.directories.find(x => x.name === parts[2]);
                            break;
                    }
                    break;
                case 'ls':
                    break;
            }
            break;
        case 'dir':
            let newDirectory = new Directory(parts[1], currentDirectory);

            allDirectories.push(newDirectory);

            currentDirectory.directories.push(newDirectory);
            break;
        default:
            currentDirectory.files.push(new File(parseInt(parts[0]), parts[1]));
            break;
    }
}

let answer = _.sumBy(_.filter(allDirectories, x => x.size() < 100000), x => x.size());

end(time, answer, execution);
