import * as fs from "fs";
import * as consola from "consola";
import { Execution } from "./models";

export function start(executions: Execution[], executionIndex: number) {
  let result = {
    time: new Date().getTime(),
    execution: executions[executionIndex],
  };

  if (!result.execution) {
    throw new Error("Execution not found");
  }

  return result;
}

export function timeStamp(time: number, message: string = null) {
  if (message) {
    console.log("Stamp at " + (new Date().getTime() - time) + "ms: " + message);
  } else {
    console.log("Stamp at " + (new Date().getTime() - time) + "ms");
  }
}

export function end(time: number, answer: any, execution: Execution) {
  let executionTime = new Date().getTime() - time;

  if (execution.answer) {
    if (answer === execution.answer) {
      consola.default.success("Valid");
    } else if (
      answer &&
      typeof answer === "string" &&
      answer.indexOf("VISUALISATION") >= 0
    ) {
      consola.default.success(
        "Manual validation needed, because result is a visualisation"
      );
    } else {
      consola.default.error("Invalid, must be " + execution.answer);
    }
  } else {
    consola.default.warn("No answer provided");
  }

  if (typeof answer === "string" && answer.indexOf("\r\n") >= 0) {
    consola.default.info("Answer");
    console.log(answer);
  } else {
    consola.default.info("Answer   " + answer);
  }

  consola.default.info("Time     " + executionTime + "ms");

  console.log();

  process.send(executionTime);
}

export function read(day: string, execution: Execution) {
  if (execution.file.indexOf("test") >= 0) {
    consola.default.warn("USING TEST FILE");
  }

  return fs.readFileSync("src/day" + day + "/_" + execution.file + ".txt", {
    encoding: "utf8",
  });
}

export function readAsLines(
  day: string,
  execution: Execution,
  seperator: string = "\r\n"
): string[] {
  return read(day, execution).split(seperator);
}

export function readFirstLineAsNumbers(
  day: string,
  execution: Execution,
  seperator: string = "\r\n"
): number[] {
  return read(day, execution)
    .split(seperator)[0]
    .split(",")
    .map((x) => parseInt(x));
}

export function writeFile(day: string, name: string, data: string) {
  fs.writeFileSync("dist/day" + day + "/output_" + name + ".txt", data);
}

let config = {
  logging: true,
};

export function setConfigLogging(enabled: boolean) {
  config.logging = enabled;
}

export function log(message: string) {
  if (!config.logging) {
    return;
  }

  console.log(message);
}
