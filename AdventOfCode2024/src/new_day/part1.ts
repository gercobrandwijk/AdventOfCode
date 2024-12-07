import * as _ from "lodash";
import { end, readAsLines, setConfigLogging, start } from "../helpers";

let { time, execution } = start(
  [
    { file: "test", answer: undefined },
    { file: "input", answer: undefined },
  ],
  0
);

setConfigLogging(false);

let lines = readAsLines("XX", execution);

//////////
//////////
//////////
//////////
//////////
//////////

let answer = undefined;

end(time, answer, execution);
