import nodemon, { LogMessage as BaseLogMessage } from "nodemon";

declare module "nodemon" {
  interface LogMessage extends BaseLogMessage {
    source: "app" | "nodemon";
  }

  function addListener(event: "log", listener: (msg: LogMessage) => void): typeof nodemon;
  function on(event: "log", listener: (msg: LogMessage) => void): typeof nodemon;
  function once(event: "log", listener: (msg: LogMessage) => void): typeof nodemon;
  function emit(event: "log", msg: LogMessage): boolean;
}

export = nodemon;
