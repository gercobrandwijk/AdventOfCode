"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFirstLineAsNumbers = exports.readAsLines = exports.read = exports.end = exports.timeStamp = exports.start = void 0;
const fs = __importStar(require("fs"));
const consola = __importStar(require("consola"));
function start(executions, executionIndex) {
    let result = {
        time: new Date().getTime(),
        execution: executions[executionIndex]
    };
    if (!result.execution) {
        throw new Error("Execution not found");
    }
    return result;
}
exports.start = start;
function timeStamp(time, message = null) {
    if (message) {
        console.log('Stamp at ' + (new Date().getTime() - time) + 'ms: ' + message);
    }
    else {
        console.log('Stamp at ' + (new Date().getTime() - time) + 'ms');
    }
}
exports.timeStamp = timeStamp;
function end(time, answer, execution) {
    let executionTime = new Date().getTime() - time;
    if (execution.answer) {
        if (answer === execution.answer) {
            consola.default.success("Valid");
        }
        else if (answer && typeof answer === 'string' && answer.indexOf("VISUALISATION") >= 0) {
            consola.default.success("Manual validation needed, because result is a visualisation");
        }
        else {
            consola.default.error("Invalid, must be " + execution.answer);
        }
    }
    else {
        consola.default.warn("No answer provided");
    }
    if (typeof answer === 'string' && answer.indexOf('\r\n') >= 0) {
        consola.default.info("Answer");
        console.log(answer);
    }
    else {
        consola.default.info("Answer   " + answer);
    }
    consola.default.info("Time     " + executionTime + "ms");
    console.log();
    // process.send(executionTime);
}
exports.end = end;
function read(day, execution) {
    if (execution.file.indexOf("test") >= 0) {
        consola.default.warn("USING TEST FILE");
    }
    return fs.readFileSync("src/day" + day + "/_" + execution.file + ".txt", {
        encoding: "utf8",
    });
}
exports.read = read;
function readAsLines(day, execution, seperator = "\r\n") {
    return read(day, execution).split(seperator);
}
exports.readAsLines = readAsLines;
function readFirstLineAsNumbers(day, execution, seperator = "\r\n") {
    return read(day, execution).split(seperator)[0].split(',').map(x => parseInt(x));
}
exports.readFirstLineAsNumbers = readFirstLineAsNumbers;
function writeFile(day, name, data) {
    fs.writeFileSync("dist/day" + day + "/output_" + name + ".txt", data);
}
exports.writeFile = writeFile;
//# sourceMappingURL=helpers.js.map