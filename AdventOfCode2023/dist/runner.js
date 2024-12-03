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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const childProcess = __importStar(require("child_process"));
const consola = __importStar(require("consola"));
const directoryPath = path.join(__dirname);
let executionTime = 0;
function runScript(scriptPath, callback) {
    var callbackReceived = false;
    var childProcessFork = childProcess.fork(scriptPath);
    function done(err) {
        callback(err);
    }
    childProcessFork.on("message", function (message) {
        executionTime += parseInt(message.toString(), 10);
    });
    childProcessFork.on("error", function (err) {
        if (callbackReceived) {
            return;
        }
        callbackReceived = true;
        done(err);
    });
    childProcessFork.on("exit", function (code) {
        if (callbackReceived) {
            return;
        }
        callbackReceived = true;
        var err = code === 0 ? null : new Error("exit code " + code);
        done(err);
    });
}
let days = fs.readdirSync(directoryPath).filter((x) => {
    if (process.argv[2]) {
        if (process.argv[2] === "today") {
            return x === "day" + ("0" + new Date().getDate()).slice(-2);
        }
        if (process.argv[2].startsWith("day")) {
            return x.startsWith(process.argv[2]);
        }
    }
    return x.startsWith("day");
});
let promiseChain = Promise.resolve();
for (let day of days) {
    let paths = ["dist/" + day + "/part1.js", "dist/" + day + "/part2.js"];
    for (let path of paths) {
        promiseChain = promiseChain.then(() => {
            return new Promise((resolve) => {
                let pathSplitted = path.substring(path.indexOf("/") + 1);
                let name = pathSplitted.split("/")[0];
                let part = pathSplitted.split("/")[1].split(".js")[0];
                console.log(name + " - " + part);
                runScript(path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    resolve();
                });
            });
        });
    }
}
promiseChain = promiseChain.then(() => {
    consola.default.info("Total    " + executionTime + "ms");
    console.log();
});
//# sourceMappingURL=runner.js.map